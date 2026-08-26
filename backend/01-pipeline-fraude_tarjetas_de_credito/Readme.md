# 💳 Financial Fraud ETL Pipeline & Analytics Warehouse

Pipeline automatizado de Extracción, Transformación y Carga (**ETL**) desarrollado en **Python** para la ingesta, limpieza, enriquecimiento y análisis de riesgo en transacciones bancarias, con persistencia y modelado relacional en **SQLite**.

---

## 📌 Arquitectura y Flujo de Datos

1. **Extracción (Extract):** Ingesta masiva de transacciones financieras desde fuentes tabulares (`CSV`), validando integridad de rutas y estructura de datos.
2. **Transformación (Transform):**
   * Eliminación y control de registros duplicados por `transaction_id`.
   * Depuración de valores nulos o incompletos (`dropna`).
   * **Feature Engineering:** Segmentación de riesgo por rangos de monto (`Bajo`, `Medio`, `Alto`, `Crítico`).
   * Normalización y etiquetado categórico del estado de fraude.
3. **Carga & Analítica (Load):**
   * Persistencia estructurada en la tabla relacional `transacciones_bancarias`.
   * Creación de **Vistas SQL (`VIEW`)** para auditoría y KPIs de negocio (`v_resumen_categoria`, `v_resumen_riesgo`).

---

## 📊 Métricas y Reporte SQL Generado

El pipeline calcula automáticamente el volumen operacional y el impacto financiero por categoría:

| Comercio | Transacciones | Fraudes Detectados | Total Defraudado |
| :--- | :--- | :--- | :--- |
| **Clothing** | 2,050 | 24 | $3,884.94 |
| **Electronics** | 1,923 | 24 | $5,855.07 |
| **Food** | 2,093 | 35 | $7,534.58 |
| **Grocery** | 1,944 | 39 | $8,684.52 |
| **Travel** | 1,990 | 29 | $6,684.52 |

---

## 🛠️ Stack Tecnológico

* **Lenguaje:** Python 3.10+
* **Procesamiento de Datos:** Pandas
* **Motor Relacional:** SQLite / SQL ANSI (DDL, DML, Agrupaciones y Vistas)
* **Dataset:** [Credit Card Fraud Detection Dataset](https://www.kaggle.com/datasets/miadul/credit-card-fraud-detection-dataset)

---

## 🚀 Ejecución Local

1. Instalar dependencias:
   ```bash
   pip install pandas