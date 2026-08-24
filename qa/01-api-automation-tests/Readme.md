# 🧪 Data Integrity & Schema Automation Test Suite (QA)

Suite automatizada de aseguramiento de calidad (**QA**) y validación de esquemas de datos desarrollada en **Python** con **Pytest**. 

Esta suite audita y valida las reglas de negocio, integridad de contratos y consistencia de las transacciones generadas por el pipeline ETL financiero.

---

## 📌 Casos de Prueba Automatizados

* **TC-DATA-01:** Validación de formato y carga de estructura JSON masiva.
* **TC-DATA-02 (Schema Contract):** Aseguramiento de presencia de claves obligatorias (`transaction_id`, `amount`, `is_fraud`, `merchant_category`).
* **TC-DATA-03 (Regla Financiera):** Control de valores no nulos y montos estrictamente positivos ($> 0$).
* **TC-DATA-04 (Consistencia de Estados):** Control de dominios válidos para la clasificación de fraude (`0` o `1`).
* **TC-DATA-05 (Catálogo de Negocio):** Verificación de integridad en categorías comerciales permitidas.

---

## 🚀 Ejecución de Pruebas

1. Instalar Pytest:
   ```bash
   pip install pytest