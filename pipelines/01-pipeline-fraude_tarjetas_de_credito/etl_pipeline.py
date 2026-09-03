import os
import logging
import sqlite3
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_RAW = os.path.join(BASE_DIR, "data", "credit_card.csv")
DB_OUTPUT = os.path.join(BASE_DIR, "fraud_warehouse.db")
LOG_FILE = os.path.join(BASE_DIR, "registro_fraudes.log")


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s : %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("etl_pipeline")




def extract_data(ruta: str) -> pd.DataFrame:
    logger.info(f"[1/3] Se Extraen Los datos desde: {ruta}")
    if not os.path.exists(ruta):
        logger.error(f"No se encontró el dataset en {ruta}")
        raise FileNotFoundError(f"Archivo no disponible: {ruta}")
    df = pd.read_csv(ruta)
    logger.info(f"-> Total transacciones extraídas: {len(df):,}")
    return df


def transform_data(df: pd.DataFrame) -> pd.DataFrame:
    logger.info("\n[2/3] Transformando y enriqueciendo transacciones...")

    duplicados = df.duplicated(subset=["transaction_id"]).sum()
    df = df.drop_duplicates(subset=["transaction_id"], keep="first")
    df = df.dropna()
    logger.info(f"-> Registros duplicados eliminados: {duplicados:,}")

    bins = [0, 50, 200, 1000, float("inf")]
    labels = ["Bajo (0-50)", "Medio (50-200)", "Alto (200-1000)", "Crítico (>1000)"]
    
    df["rango_monto"] = pd.cut(df["amount"], bins=bins, labels=labels, right=False)
    df["tipo_transaccion"] = df["is_fraud"].apply(lambda x: "Fraude" if x == 1 else "Legítima")

    logger.info(f"-> Total transacciones procesadas: {len(df):,}")
    return df


def load_data(df: pd.DataFrame, db_path: str):  
    logger.info("\n[3/3] Cargando datos en almacén relacional...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    df.to_sql("transacciones_bancarias", conn, if_exists="replace", index=False)

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
    logger.info("-> Tabla 'transacciones_bancarias' y vistas analíticas creadas con éxito.")

    reporte = cursor.execute("SELECT * FROM v_resumen_categoria").fetchall()
    logger.info("\n--- REPORTE DE FRAUDE POR CATEGORÍA DE COMERCIO (GENERADO POR SQL) ---")
    for fila in reporte:
        fraude_val = fila[4] if fila[4] is not None else 0.0
        logger.info(f"Comercio: {fila[0]:<15} | Transacciones: {fila[1]:<5} | Fraudes: {fila[2]:<3} | Defraudado: ${fraude_val:,.2f}")

    conn.close()


def run_pipeline():
    try:
        raw_df = extract_data(DATA_RAW)
        clean_df = transform_data(raw_df)
        load_data(clean_df, DB_OUTPUT)
        logger.info("\n✅ Pipeline Financiero ejecutado exitosamente.")
    except Exception as e:
        logger.critical(f"\n❌ Error en el pipeline: {str(e)}")


if __name__ == "__main__":
    run_pipeline()