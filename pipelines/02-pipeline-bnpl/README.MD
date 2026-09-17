# 💳 BNPL Analytics Pipeline

**Proyecto 02 — Data Engineering & Data Analytics**

Pipeline ETL desarrollado en Python para procesar datos de operaciones **Buy Now, Pay Later (BNPL)**, aplicar controles de calidad, realizar transformaciones y generar una capa analítica en SQLite.

El proyecto amplía los fundamentos del Proyecto 01 incorporando más reglas de validación, feature engineering y múltiples vistas SQL para analizar patrones de incumplimiento según edad, proveedor y categoría de compra.

```text
Extract → Data Quality → Transform → Load → Analytics
```

---

# 🎯 Objetivo

Construir un pipeline reproducible capaz de:

* Extraer 50.000 operaciones desde un archivo CSV.
* Validar la estructura del dataset.
* Detectar registros duplicados y valores nulos.
* Validar edad, ingresos, monto de compra y Credit Score.
* Validar los estados de pago.
* Generar variables derivadas.
* Almacenar los datos procesados en SQLite.
* Crear vistas analíticas mediante SQL.
* Registrar todo el proceso mediante logging.
* Ejecutar el pipeline localmente o mediante Docker.

---

# 🏗️ Arquitectura

```text
                    bnpl.csv
                       │
                       ▼
                    EXTRACT
                       │
                       ▼
                 DATA QUALITY
                       │
       ┌───────────────┼──────────────────┐
       ▼               ▼                  ▼
 Transaction_ID   Variables numéricas   Estados
       │               │                  │
       └───────────────┼──────────────────┘
                       ▼
                   TRANSFORM
                       │
       ┌───────────────┼──────────────────┐
       ▼               ▼                  ▼
   rango_edad    nivel_credito       estado_pago
                       │
                       ▼
                     LOAD
                       │
                       ▼
                    SQLite
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Por edad    Por proveedor  Por categoría
```

---

# 📂 Estructura

```text
02-pipeline-bnpl/
│
├── data/
│   └── bnpl.csv
│
├── bnpl_pipeline.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

Durante la ejecución se generan archivos locales:

```text
bnpl_analytics.db
registro_bnpl.log
```

Estos archivos son artefactos generados por el pipeline y no forman parte del código fuente.

---

# 📄 Dataset

El dataset contiene:

```text
50.000 registros
9 columnas
```

Columnas principales:

| Campo               | Descripción                   |
| ------------------- | ----------------------------- |
| `Transaction_ID`    | Identificador de la operación |
| `Customer_Age`      | Edad del cliente              |
| `Gender`            | Género                        |
| `Annual_Income`     | Ingreso anual                 |
| `Credit_Score`      | Puntaje crediticio            |
| `Purchase_Category` | Categoría de compra           |
| `BNPL_Provider`     | Proveedor BNPL                |
| `Purchase_Amount`   | Monto de compra               |
| `Repayment_Status`  | Estado del pago               |

Estados disponibles:

```text
Paid On Time
Late Payment
Defaulted
```

---

# 🔄 Pipeline ETL

## 1. Extract

El pipeline obtiene los datos desde:

```text
data/bnpl.csv
```

Antes de procesarlos verifica que el archivo exista.

La ejecución validada obtuvo:

```text
Registros extraídos: 50.000
```

---

# 2. Data Quality

Antes de realizar las transformaciones se valida la estructura y consistencia de los datos.

## Columnas requeridas

Se comprueba la existencia de las nueve columnas esperadas:

```text
Transaction_ID
Customer_Age
Gender
Annual_Income
Credit_Score
Purchase_Category
BNPL_Provider
Purchase_Amount
Repayment_Status
```

## Identificador

Se controla la existencia de duplicados en:

```text
Transaction_ID
```

## Valores nulos

Se revisan todas las columnas requeridas antes de la carga.

## Edad

Se validan edades dentro del rango observado por el dataset:

```text
18–64
```

## Ingresos

Se descartan valores:

```text
Annual_Income <= 0
```

## Monto de compra

Se descartan valores:

```text
Purchase_Amount <= 0
```

## Credit Score

Se valida el rango:

```text
300–849
```

## Estado de pago

Los valores permitidos son:

```text
Paid On Time
Late Payment
Defaulted
```

---

# 📊 Resultado de Data Quality

En la ejecución validada:

| Control                | Resultado |
| ---------------------- | --------: |
| Registros extraídos    |    50.000 |
| Duplicados             |         0 |
| Registros con nulos    |         0 |
| Edades inválidas       |         0 |
| Ingresos inválidos     |         0 |
| Montos inválidos       |         0 |
| Credit Score inválidos |         0 |
| Estados inválidos      |         0 |
| Registros eliminados   |         0 |
| Registros procesados   |    50.000 |

El dataset pasó todas las reglas de calidad implementadas.

---

# 🧮 Feature Engineering

El pipeline genera tres variables derivadas.

## `rango_edad`

Las edades se agrupan en:

```text
18–25   → Joven
26–40   → Adulto Joven
41–60   → Adulto
61+     → Senior
```

## `nivel_credito`

Para fines exclusivamente analíticos, el Credit Score se segmenta en:

```text
300–579   → Bajo
580–669   → Medio
670–739   → Bueno
740–849   → Excelente
```

Estas categorías son reglas de segmentación utilizadas por este proyecto y no representan una evaluación crediticia real.

## `estado_pago`

Los estados originales se normalizan:

```text
Paid On Time → Al Día
Late Payment → Pago Tardío
Defaulted    → Incumplimiento
```

---

# 🗄️ Almacenamiento

Los datos transformados se cargan en:

```text
bnpl_analytics.db
```

utilizando SQLite.

La tabla principal es:

```text
clientes_credito
```

---

# 📈 Capa analítica SQL

El pipeline genera tres vistas.

## `v_riesgo_por_edad`

Agrupa las operaciones según `rango_edad`.

Métricas:

* Total de operaciones.
* Total de incumplimientos.
* Tasa de incumplimiento.
* Compra promedio.

## `v_riesgo_por_proveedor`

Agrupa las operaciones según:

```text
BNPL_Provider
```

Métricas:

* Total de operaciones.
* Total de incumplimientos.
* Tasa de incumplimiento.
* Monto total de compras.

## `v_riesgo_por_categoria`

Agrupa las operaciones según:

```text
Purchase_Category
```

Métricas:

* Total de operaciones.
* Total de incumplimientos.
* Tasa de incumplimiento.
* Compra promedio.
* Monto total de compras.

Las vistas se eliminan y recrean durante cada ejecución para mantener su definición sincronizada con el pipeline.

---

# 📊 Resultados analíticos

## Incumplimiento por rango de edad

| Grupo                | Operaciones | Incumplimientos |   Tasa |
| -------------------- | ----------: | --------------: | -----: |
| Joven (18-25)        |       8.421 |             854 | 10,14% |
| Senior (>60)         |       4.290 |             383 |  8,93% |
| Adulto (41-60)       |      21.143 |           1.801 |  8,52% |
| Adulto Joven (26-40) |      16.146 |           1.341 |  8,31% |

---

## Incumplimiento por proveedor

| Proveedor | Operaciones | Incumplimientos |  Tasa |
| --------- | ----------: | --------------: | ----: |
| Sezzle    |      12.501 |           1.114 | 8,91% |
| Afterpay  |      12.536 |           1.114 | 8,89% |
| Affirm    |      12.418 |           1.073 | 8,64% |
| Klarna    |      12.545 |           1.078 | 8,59% |

---

## Incumplimiento por categoría

| Categoría        | Operaciones | Incumplimientos |  Tasa |
| ---------------- | ----------: | --------------: | ----: |
| Electronics      |       8.303 |             794 | 9,56% |
| Travel           |       8.401 |             795 | 9,46% |
| Fashion          |       8.307 |             729 | 8,78% |
| Beauty           |       8.381 |             710 | 8,47% |
| Groceries        |       8.240 |             697 | 8,46% |
| Home & Furniture |       8.368 |             654 | 7,82% |

Estas métricas son descriptivas del dataset utilizado y no deben interpretarse como un modelo predictivo de riesgo.

---

# 📝 Logging

El pipeline registra información en:

```text
Consola
registro_bnpl.log
```

El logging permite observar:

* Extracción de datos.
* Controles de calidad.
* Registros eliminados.
* Registros procesados.
* Creación de la base de datos.
* Ejecución de las vistas analíticas.
* Resultados de los análisis.
* Errores del pipeline.

---

# 🐳 Docker

El proyecto incluye:

```text
Dockerfile
docker-compose.yml
```

Para ejecutar el pipeline mediante Docker:

```cmd
docker compose -f pipelines\02-pipeline-bnpl\docker-compose.yml up --build
```

---

# 🐍 Ejecución local

Requisitos:

* Python 3.11 o compatible.
* Pip.

Crear entorno virtual:

```cmd
python -m venv .venv
```

Activarlo:

```cmd
.venv\Scripts\activate
```

Instalar dependencias:

```cmd
pip install -r requirements.txt
```

Ejecutar:

```cmd
python pipelines\02-pipeline-bnpl\bnpl_pipeline.py
```

---

# 🧰 Tecnologías

* Python 3.11
* Pandas
* SQLite
* SQL
* Docker
* Docker Compose
* Logging
* Git

---

# 📚 Conceptos demostrados

Este proyecto demuestra experiencia práctica en:

```text
ETL
│
├── Extract
├── Transform
└── Load

Data Quality
│
├── Schema Validation
├── Data Validation
├── Duplicate Detection
└── Null Handling

Data Engineering
│
├── Feature Engineering
├── Data Cleaning
├── SQLite
└── Logging

Data Analytics
│
├── SQL Views
├── Aggregations
├── Grouping
└── Risk / Default Metrics
```

---

# ⚠️ Limitaciones

Este proyecto tiene fines educativos y de portafolio.

Actualmente:

* Utiliza un archivo CSV como fuente.
* Utiliza SQLite como almacenamiento.
* El procesamiento es batch.
* No existe procesamiento incremental.
* No existe un modelo de Machine Learning.
* Las categorías de `nivel_credito` son reglas analíticas definidas para el proyecto.
* Las métricas representan únicamente el dataset procesado.

---

# 🚀 Próximas mejoras

Como evolución del proyecto se podrían incorporar:

* Tests automatizados.
* Procesamiento incremental.
* Orquestación con Airflow o Prefect.
* PostgreSQL como almacenamiento.
* Formato Parquet.
* Validaciones automatizadas más avanzadas.
* Dashboard de métricas BNPL.
* Procesamiento histórico.
* Modelos predictivos como una etapa posterior del proyecto.

---

# 🎯 Objetivo dentro del portafolio

Este proyecto corresponde al **segundo nivel del portafolio de Data Engineering**.

Mientras el Proyecto 01 se concentra principalmente en un pipeline ETL de fraude transaccional, este proyecto amplía el flujo incorporando:

```text
Mayor volumen de datos
        ↓
Más validaciones
        ↓
Feature Engineering
        ↓
Múltiples dimensiones analíticas
        ↓
Métricas SQL
```

El objetivo es demostrar una progresión desde pipelines ETL básicos hacia procesos de datos más estructurados y orientados al análisis.
