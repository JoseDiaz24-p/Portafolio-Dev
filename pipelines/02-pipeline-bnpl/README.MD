# 📊 BNPL Credit Risk — Pipeline ETL & Analítica Financiera

Pipeline automatizado en Python para la ingesta, limpieza, transformación y persistencia de datos crediticios bajo el modelo **Buy Now Pay Later (BNPL)**, integrando almacenamiento relacional y vistas analíticas en SQLite.

---

## 🎯 Objetivo

Procesar datos históricos de clientes para clasificar tramos etarios, normalizar estados de pago y calcular métricas clave de morosidad mediante SQL, facilitando el análisis del riesgo de impago (*default*).

---

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** Python 3.x
* **Librerías:** Pandas, OS, SQLite3
* **Base de Datos:** SQLite
* **Conceptos:** Arquitectura ETL modular, Feature Engineering (`pd.cut`, `apply`), Manejo de Duplicados/Nulos, SQL Analytics (`CREATE VIEW`, `SUM(CASE WHEN...)`, `GROUP BY`).

---

## 🚀 Fases del Pipeline

1. **Extracción (`extraer_datos`):** Carga dinámica y validación de existencia del dataset crudo en la ruta `./data/BNPL.csv`.
2. **Transformación (`transformar_datos`):**
   * Eliminación de registros duplicados basados en `Customer_ID`.
   * Depuración de valores nulos.
   * Discretización de edades en 4 rangos etarios continuos: Joven (18-25), Adulto Joven (26-40), Adulto (41-60) y Senior (>60).
   * Mapeo del estado de riesgo a variables legibles (`En Mora` / `Al Día`).
3. **Carga y Analítica (`cargar_datos`):**
   * Persistencia en tabla relacional `clientes_credito` dentro de `bnpl_analytics.db`.
   * Creación de la vista SQL `v_riesgo_por_edad` para el cálculo automático del volumen de clientes, total de mora y tasa porcentual por grupo etario.

---

## 📥 Dataset de Entrada

El dataset utilizado corresponde a datos públicos de riesgo crediticio BNPL.
* **Fuente:** [Kaggle - Buy Now Pay Later (BNPL) Default Risk](https://www.kaggle.com/datasets/itzzomkar/buy-now-pay-later-bnpl-default-risk)
* **Ubicación requerida:** Descargar el archivo `.csv`, renombrarlo a `BNPL.csv` y ubicarlo en la carpeta `data/`:
  ```text
  ├── data/
  │   └── BNPL.csv
  ├── pipeline_bnpl.py
  ├── requirements.txt
  └── README.md