import os
import sqlite3
import pandas as pd

# 1. os.path.abspath(__file__)
# Devuelve la ruta absoluta del archivo Python que se está ejecutando
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. os.path.dirname(...)
# Obtiene la carpeta contenedora (directorio) de la ruta que le pases.
DATA_RAW = os.path.join(BASE_DIR, "data", "credit_card.csv")

# 3. os.path.join(...)
# Une carpetas y archivos usando los separadores correctos según el sistema operativo (/ en Linux/Mac, \ en Windows).
DB_OUTPUT = os.path.join(BASE_DIR, "fraud_warehouse.db")


def extract_data(ruta: str) -> pd.DataFrame:
    print(f"[1/3] Se Extraen Los datos desde: {ruta}")
    # 4. os.path.exists(...)
    # Devuelve True si el archivo o carpeta existe físicamente en el disco, o False si no.
    if not os.path.exists(ruta):
        raise FileNotFoundError(f"No se encontró el dataset en {ruta}")
    df = pd.read_csv(ruta)
    print(f"-> Total transacciones extraídas: {len(df):,}")
    return df


def transform_data(df: pd.DataFrame) -> pd.DataFrame:
    """Fase 2: Limpieza, validación y categorización de negocio."""
    print("\n[2/3] Transformando y enriqueciendo transacciones...")

    # 1. Control de duplicados por ID de transacción
    duplicados = df.duplicated(subset=["transaction_id"]).sum()#subset sirve para identificar los duplicados en esa columna
    #elimina los duplicados y se queda con el primer duplicado que encontro
    df = df.drop_duplicates(subset=["transaction_id"], keep="first") #keep="first es para que al encontra 2 duplicados guarde el primero que encontro
   
    #elimina los valores nulos de toda la tabla
   #Si un registro tiene el transaction_id perfecto,
   #pero le falta el precio, la fecha o el nombre del cliente,
   #df.dropna() va a borrar la fila completa.
   #eliminar únicamente las filas donde el transaction_id esté vacío, debes usar el parámetro subset
   #ejemplo :Esto SOLO borra la fila si el 'transaction_id' es nulo
   #df = df.dropna(subset=["transaction_id"])
    df = df.dropna()
    print(f"-> Registros duplicados eliminados: {duplicados:,}")

    # 2. Segmentación de riesgo por rangos de monto
    #solo son declaraciones de listas
    bins = [0, 50, 200, 1000, float("inf")]
    labels = ["Bajo (0-50)", "Medio (50-200)", "Alto (200-1000)", "Crítico (>1000)"]
    
    #cut() es para segmentar, lo que hace es tomar una fila en este caso amount
    # y dependiendo del valor de bins deja un mensaje labels 
    #right=False es el número inicial del rango sí entra, pero el número final no entra
    #ejemplo0 y 50 solo entra hasta el 49
    df["rango_monto"] = pd.cut(df["amount"], bins=bins, labels=labels, right=False)

    # 3. Etiquetado descriptivo del fraude
    #el .apply() se usa como un for rapido  lo que hace que recorra cada elemento de is_fraud y lo pasa a lambda
    #en este caso lambda que es para hacer validaciones rapidas como un if
    #lo que dice es que x = "Fraude" solo si x==1 de lo contrario es "legitima"
    df["tipo_transaccion"] = df["is_fraud"].apply(lambda x: "Fraude" if x == 1 else "Legítima")

    print(f"-> Total transacciones procesadas: {len(df):,}")
    return df


def load_data(df: pd.DataFrame, db_path: str):  
    """Fase 3: Carga en Base de Datos Relacional y creación de vistas SQL."""
    print("\n[3/3] Cargando datos en almacén relacional...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Carga de la tabla principal
    # if_exists='replace': Si la tabla existe, la borra y la crea de nuevo con los datos nuevos
    # index=False: Evita que el índice numérico de Pandas se guarde como una columna extra
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