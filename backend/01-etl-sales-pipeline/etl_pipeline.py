import os
import sqlite3
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_RAW = os.path.join(BASE_DIR, "data", "credit_card.csv")
DB_OUTPUT = os.path.join(BASE_DIR, "fraud_warehouse.db")


def extract_data(file_path: str) -> pd.DataFrame:
    """Fase 1: Extracción de transacciones bancarias."""
    print(f"[1/3] Extrayendo datos desde: {file_path}")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"No se encontró el dataset en {file_path}")
    df = pd.read_csv(file_path)
    print(f"-> Total transacciones extraídas: {len(df):,}")
    return df


def transform_data(df: pd.DataFrame) -> pd.DataFrame:
    """Fase 2: Limpieza, validación y categorización de negocio."""
    print("\n[2/3] Transformando y enriqueciendo transacciones...")

    # 1. Control de duplicados por ID de transacción
    duplicados = df.duplicated(subset=["transaction_id"]).sum()
    df = df.drop_duplicates(subset=["transaction_id"], keep="first")
    df = df.dropna()
    print(f"-> Registros duplicados eliminados: {duplicados:,}")

    # 2. Segmentación de riesgo por rangos de monto
    bins = [0, 50, 200, 1000, float("inf")]
    labels = ["Bajo (0-50)", "Medio (50-200)", "Alto (200-1000)", "Crítico (>1000)"]
    df["rango_monto"] = pd.cut(df["amount"], bins=bins, labels=labels, right=False)

    # 3. Etiquetado descriptivo del fraude
    df["tipo_transaccion"] = df["is_fraud"].apply(lambda x: "Fraude" if x == 1 else "Legítima")

    print(f"-> Total transacciones procesadas: {len(df):,}")
    return df


def load_data(df: pd.DataFrame, db_path: str):
    """Fase 3: Carga en Base de Datos Relacional y creación de vistas SQL."""
    print("\n[3/3] Cargando datos en almacén relacional...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Carga de la tabla principal
    df.to_sql("transacciones_bancarias", conn, if_exists="replace", index=False)

    # Vista SQL: KPIs de fraude agrupados por categoría de comercio
    cursor.execute("""
    CREATE VIEW IF NOT EXISTS v_resumen_categoria AS
    SELECT 
        merchant_category AS categoria_comercio,
        COUNT(transaction_id) AS total_operaciones,
        SUM(CASE WHEN is_fraud = 1 THEN 1 ELSE 0 END) AS total_fraudes,
        ROUND(AVG(amount), 2) AS ticket_promedio,
        ROUND(SUM(CASE WHEN is_fraud = 1 THEN amount ELSE 0 END), 2) AS total_defraudado
    FROM transacciones_bancarias
    GROUP BY merchant_category;
    """)

    # Vista SQL: KPIs de fraude agrupados por rango de dinero
    cursor.execute("""
    CREATE VIEW IF NOT EXISTS v_resumen_riesgo AS
    SELECT 
        rango_monto,
        COUNT(transaction_id) AS total_transacciones,
        SUM(CASE WHEN is_fraud = 1 THEN 1 ELSE 0 END) AS casos_fraude,
        ROUND(AVG(amount), 2) AS monto_promedio,
        ROUND(SUM(CASE WHEN is_fraud = 1 THEN amount ELSE 0 END), 2) AS monto_total_defraudado
    FROM transacciones_bancarias
    GROUP BY rango_monto;
    """)

    conn.commit()
    print("-> Tabla 'transacciones_bancarias' y vistas analíticas creadas con éxito.")

    # Consulta de validación
    reporte = cursor.execute("SELECT * FROM v_resumen_categoria").fetchall()
    print("\n--- REPORTE DE FRAUDE POR CATEGORÍA DE COMERCIO (GENERADO POR SQL) ---")
    for fila in reporte:
        fraude_val = fila[4] if fila[4] is not None else 0.0
        print(f"Comercio: {fila[0]:<15} | Transacciones: {fila[1]:<5} | Fraudes: {fila[2]:<3} | Defraudado: ${fraude_val:,.2f}")

    conn.close()


def run_pipeline():
    try:
        raw_df = extract_data(DATA_RAW)
        clean_df = transform_data(raw_df)
        load_data(clean_df, DB_OUTPUT)
        print("\n✅ Pipeline Financiero ejecutado exitosamente.")
    except Exception as e:
        print(f"\n❌ Error en el pipeline: {str(e)}")


if __name__ == "__main__":
    run_pipeline()