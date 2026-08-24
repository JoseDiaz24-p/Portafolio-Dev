# 📋 Matriz de Casos de Prueba — Integridad y Esquema de Datos Financieros (JSON)

## 🎯 Alcance
Validación de esquema JSON, tipos de datos, reglas de negocio bancario (montos, categorías válidas) y ausencia de registros huérfanos o nulos en el archivo exportado por el Pipeline ETL.

---

### Matriz de Pruebas (QA Test Matrix)

| ID Caso | Módulo / Validación | Tipo de Prueba | Precondición | Criterio de Aceptación / Regla de Negocio | Prioridad |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-DATA-01** | Disponibilidad & Carga | Smoke / File | Archivo JSON generado | El archivo existe, es un JSON válido y contiene más de 0 registros. | Alta |
| **TC-DATA-02** | Contrato de Esquema | Contract / Schema | Carga exitosa | Cada transacción contiene todas las claves requeridas (`transaction_id`, `amount`, `is_fraud`, etc.). | Crítica |
| **TC-DATA-03** | Regla de Montos Positivos | Lógica de Negocio | Registros cargados | Ninguna transacción tiene monto (`amount`) menor o igual a cero. | Alta |
| **TC-DATA-04** | Integridad de Fraude | Regla de Negocio | Registros cargados | El campo `is_fraud` solo contiene valores binarios permitidos (0 o 1). | Alta |
| **TC-DATA-05** | Validación de Categorías | Consistencia de Datos | Registros cargados | El comercio (`merchant_category`) pertenece a las categorías oficiales del banco. | Media |