import os
import logging
import sqlite3
import pandas as pd
from src.etl.transformador import FintechTransformadorDatos

def run_etl():
    directorioBase = os.path.dirname(os.path.abspath(__file__))
    ruta = os.path.join(directorioBase, "data", "digital_wallet_ltv_dataset.csv")
    db = os.path.join(directorioBase, "fraud_warehouse.db")
    LOG_FILE = os.path.join(directorioBase, "registro_logs.log")
    
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s : %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[
            logging.FileHandler(LOG_FILE, encoding="utf-8"),
            logging.StreamHandler()
        ]
    )

    logger = logging.getLogger("run_pipeline")
    
    logger.info(f"[1/3] Datos Extrayendose Desde: {ruta}")
    if not os.path.exists(ruta):
        logger.error(f"No Se Encontro El Archivo En: {ruta}")
        raise FileNotFoundError(f"Archivo no disponible: {ruta}")
    df_inicial = pd.read_csv(ruta)
    logger.info(f"-> Se extrajeron un total de {len(df_inicial):,} registros")
    
    logger.info("-> SE Esta Empezando A Ejecutar Las Transformaciones Y Logica De Negocios...")
    transformador = FintechTransformadorDatos(df_inicial)
    procesador = transformador.limpieza_datos().agregar_metricas_negocio().datos_limpios()
    
    logger.info(f"-> Cargando {len(procesador)} Registros En BD ({db})")
    
    conn = sqlite3.connect(db)
    
    procesador.to_sql("dim_customers_ltv",conn,if_exists="replace",index=False)
    
    cursor = conn.cursor()
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_customer_id ON dim_customers_ltv (Customer_ID);")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_segment ON dim_customers_ltv (Customer_Segment);")
    conn.commit()
    conn.close()
    print("✓ Pipeline ETL finalizado exitosamente.")

if __name__ == "__main__":
    run_etl()