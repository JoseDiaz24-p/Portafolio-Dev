import os
import sqlite3
import pandas as pd

ruta = os.path.dirname(os.path.abspath(__file__))
directorio = os.path.join(ruta, "data", "BNPL.csv")
bd = os.path.join(ruta, "bnpl_analytics.db")  # Base de datos SQLite


def extraer_datos(ruta: str) -> pd.DataFrame:
    print(f"[1/3] Extrayendo datos desde: {ruta}")
    if not os.path.exists(ruta):
        raise FileNotFoundError(f"No se encontró el archivo en {ruta}")
    
    df = pd.read_csv(ruta)
    print(f"-> Total de datos extraídos: {len(df):,}")
    return df


def transformar_datos(df: pd.DataFrame) -> pd.DataFrame:
    print("\n[2/3] Transformando y limpiando datos...")
    
    # 1. Duplicados y nulos
    duplicados = df.duplicated(subset=["Customer_ID"]).sum()
    df = df.drop_duplicates(subset=["Customer_ID"], keep="first")
    df = df.dropna()
    print(f"-> Registros duplicados eliminados: {duplicados:,}")

    # 2. Segmentación continua por edades
    bins = [18, 26, 41, 61, float("inf")]
    labels = ["Joven (18-25)", "Adulto Joven (26-40)", "Adulto (41-60)", "Senior (>60)"]
    df["rango_edad"] = pd.cut(df["Age"], bins=bins, labels=labels, right=False)

    # 3. Etiquetado descriptivo
    df["estado_mora"] = df["Default_Risk"].apply(lambda x: "En Mora" if x == 1 else "Al Día")

    print(f"-> Total de datos procesados: {len(df):,}")
    return df


def cargar_datos(df: pd.DataFrame, db_path: str):
    print("\n[3/3] Guardando en almacén relacional...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 1. Guardar el DataFrame como tabla SQL
    df.to_sql("clientes_credito", conn, if_exists="replace", index=False)

    # 2. Crear la Vista SQL con los KPIs por rango de edad
    cursor.execute("""
    CREATE VIEW IF NOT EXISTS v_riesgo_por_edad AS
    SELECT 
        rango_edad,
        COUNT(Customer_ID) AS total_clientes,
        SUM(CASE WHEN Default_Risk = 1 THEN 1 ELSE 0 END) AS total_en_mora,
        ROUND(AVG(CASE WHEN Default_Risk = 1 THEN 1.0 ELSE 0.0 END) * 100, 2) AS tasa_mora_porcentaje
    FROM clientes_credito
    GROUP BY rango_edad;
    """)
    conn.commit()

    # 3. Consultar la vista e imprimir resultados
    print("\n--- REPORTE DE MORA POR RANGO DE EDAD (VISTA SQL) ---")
    reporte = cursor.execute("SELECT * FROM v_riesgo_por_edad").fetchall()
    
    for fila in reporte:
        print(f"Grupo: {fila[0]:<22} | Clientes: {fila[1]:<6} | En Mora: {fila[2]:<5} | Tasa Mora: {fila[3]}%")

    conn.close()


def run_pipeline():
    try:
        raw_df = extraer_datos(directorio)
        clean_df = transformar_datos(raw_df)
        cargar_datos(clean_df, bd)
        print("\n✅ Pipeline BNPL ejecutado con éxito.")
    except Exception as e:
        print(f"\n❌ Error en el proceso: {str(e)}")


if __name__ == "__main__":
    run_pipeline()