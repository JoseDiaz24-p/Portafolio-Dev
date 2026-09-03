import os
import logging
import sqlite3
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_RAW = os.path.join(BASE_DIR, "data", "BNPL.csv")
DB_OUTPUT = os.path.join(BASE_DIR, "bnpl_analytics.db")
LOG_FILE = os.path.join(BASE_DIR, "registro_bnpl.log")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s : %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("bnpl_pipeline")


def extraer_datos(ruta: str) -> pd.DataFrame:
    logger.info(f"[1/3] Extrayendo datos desde: {ruta}")
    if not os.path.exists(ruta):
        logger.error(f"No se encontró el dataset en {ruta}")
        raise FileNotFoundError(f"No se encontró el archivo en {ruta}")
    
    df = pd.read_csv(ruta)
    logger.info(f"-> Total de registros extraídos: {len(df):,}")
    return df


def transformar_datos(df: pd.DataFrame) -> pd.DataFrame:
    logger.info("[2/3] Transformando y limpiando datos crediticios...")
    
    duplicados = df.duplicated(subset=["Customer_ID"]).sum()
    df = df.drop_duplicates(subset=["Customer_ID"], keep="first")
    df = df.dropna()
    logger.info(f"-> Registros duplicados eliminados: {duplicados:,}")

    bins = [18, 26, 41, 61, float("inf")]
    labels = ["Joven (18-25)", "Adulto Joven (26-40)", "Adulto (41-60)", "Senior (>60)"]
    df["rango_edad"] = pd.cut(df["Age"], bins=bins, labels=labels, right=False)

    df["estado_mora"] = df["Default_Risk"].apply(lambda x: "En Mora" if x == 1 else "Al Día")

    logger.info(f"-> Total de transacciones procesadas: {len(df):,}")
    return df


def cargar_datos(df: pd.DataFrame, db_path: str):
    logger.info("[3/3] Guardando en almacén relacional...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    df.to_sql("clientes_credito", conn, if_exists="replace", index=False)

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

    logger.info("--- REPORTE DE MORA POR RANGO DE EDAD (VISTA SQL) ---")
    reporte = cursor.execute("SELECT * FROM v_riesgo_por_edad").fetchall()
    
    for fila in reporte:
        logger.info(f"Grupo: {fila[0]:<22} | Clientes: {fila[1]:<6} | En Mora: {fila[2]:<5} | Tasa Mora: {fila[3]}%")

    conn.close()


def run_pipeline():
    try:
        raw_df = extraer_datos(DATA_RAW)
        clean_df = transformar_datos(raw_df)
        cargar_datos(clean_df, DB_OUTPUT)
        logger.info("✅ Pipeline BNPL ejecutado con éxito.")
    except Exception as e:
        logger.critical(f"❌ Error en el proceso: {str(e)}")


if __name__ == "__main__":
    run_pipeline()