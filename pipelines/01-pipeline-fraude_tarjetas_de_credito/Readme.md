# 💳 Credit Card Fraud Detection Pipeline

**Proyecto 01 — Data Engineering**

Pipeline ETL desarrollado en Python para procesar transacciones financieras, aplicar controles de calidad de datos, generar variables derivadas y cargar la información procesada en SQLite para su posterior análisis mediante SQL.

El proyecto representa la base del portafolio de **Data Engineering**, demostrando el flujo fundamental:

```text
Extract → Transform → Load → Analytics
```

---

## 🎯 Objetivo

Construir un pipeline reproducible capaz de:

* Extraer transacciones desde un archivo CSV.
* Validar la estructura de los datos.
* Detectar registros inválidos.
* Eliminar duplicados y valores no válidos.
* Generar variables derivadas.
* Clasificar transacciones por rango de monto.
* Almacenar los datos procesados en SQLite.
* Crear vistas SQL para análisis de fraude.
* Registrar el proceso mediante logging.
* Ejecutar el pipeline mediante Python o Docker.

---

# 🏗️ Arquitectura

```text
credit_card.csv
       │
       ▼
   EXTRACT
       │
       ▼
DATA QUALITY
       │
       ├── Columnas requeridas
       ├── Duplicados
       ├── Valores nulos
       ├── is_fraud inválido
       ├── amount inválido
       └── transaction_id vacío
       │
       ▼
  TRANSFORM
       │
       ├── rango_monto
       └── tipo_transaccion
       │
       ▼
    LOAD
       │
       ▼
SQLite
       │
       ├── v_resumen_categoria
       │
       └── v_resumen_riesgo
```

---

# 📂 Estructura del proyecto

```text
01-pipeline-fraude_tarjetas_de_credito/
│
├── data/
│   └── credit_card.csv
│
├── Dockerfile
├── docker-compose.yml
├── etl_pipeline.py
├── requirements.txt
└── Readme.md
```

Durante la ejecución se generan archivos locales que no forman parte del código fuente:

```text
fraud_warehouse.db
registro_fraudes.log
```

Estos archivos se encuentran excluidos del control de versiones.

---

# 🔄 Pipeline ETL

## 1. Extract

El pipeline carga:

```text
data/credit_card.csv
```

mediante Pandas.

Antes de procesar los datos se verifica que el archivo exista y se registra la cantidad de registros extraídos.

---

## 2. Data Quality

Antes de cargar los datos se realizan diferentes validaciones.

### Columnas requeridas

El pipeline verifica la existencia de:

```text
transaction_id
amount
is_fraud
merchant_category
```

Si falta alguna de estas columnas, el proceso genera un error.

### Duplicados

Se verifica la unicidad de:

```text
transaction_id
```

Los registros duplicados se eliminan conservando la primera aparición.

### Valores nulos

Se eliminan registros que contengan valores nulos en las columnas requeridas.

### Valores de fraude

La variable:

```text
is_fraud
```

debe contener únicamente:

```text
0 → Transacción legítima
1 → Transacción fraudulenta
```

Los valores diferentes son considerados inválidos.

### Montos

Se valida que:

```text
amount > 0
```

Los montos menores o iguales a cero son considerados inválidos.

### Identificador de transacción

Los `transaction_id` vacíos también son descartados.

---

# 🧮 Feature Engineering

Una vez superadas las validaciones, el pipeline genera variables adicionales.

## Rango de monto

Las transacciones son clasificadas en cuatro categorías:

| Rango        | Categoría |
| ------------ | --------- |
| 0 – 49.99    | Bajo      |
| 50 – 199.99  | Medio     |
| 200 – 999.99 | Alto      |
| ≥ 1000       | Crítico   |

La variable generada es:

```text
rango_monto
```

---

## Tipo de transacción

A partir de `is_fraud` se genera:

```text
tipo_transaccion
```

con los valores:

```text
Fraude
Legítima
```

---

# 🗄️ Almacenamiento

Los datos procesados son almacenados en:

```text
fraud_warehouse.db
```

utilizando SQLite.

La tabla principal es:

```text
transacciones_bancarias
```

La base de datos es generada automáticamente durante la ejecución del pipeline.

---

# 📊 Capa analítica SQL

El proyecto genera dos vistas analíticas.

## `v_resumen_categoria`

Permite analizar el comportamiento del fraude por categoría de comercio.

Incluye:

* Categoría de comercio.
* Total de operaciones.
* Total de fraudes.
* Tasa de fraude.
* Ticket promedio.
* Total defraudado.

La tasa de fraude se calcula como:

```text
fraudes / total de operaciones × 100
```

---

## `v_resumen_riesgo`

Permite analizar el fraude según el rango de monto.

Incluye:

* Rango de monto.
* Total de transacciones.
* Casos de fraude.
* Tasa de fraude.
* Monto promedio.
* Monto total defraudado.

---

# 📈 Resultado de una ejecución

En una ejecución del pipeline se procesaron:

```text
Registros extraídos:       10,000
Duplicados detectados:          0
Registros con nulos:            0
is_fraud inválidos:              0
Montos inválidos:                1
Registros eliminados:            1
Registros procesados:        9,999
```

El pipeline detectó correctamente un registro con un monto inválido y lo eliminó antes de cargar los datos en SQLite.

---

## Análisis por rango de monto

Resultado obtenido:

| Rango           | Transacciones | Fraudes |   Tasa |
| --------------- | ------------: | ------: | -----: |
| Crítico (>1000) |            35 |       5 | 14.29% |
| Bajo (0-50)     |         2,471 |      43 |  1.74% |
| Alto (200-1000) |         3,152 |      49 |  1.55% |
| Medio (50-200)  |         4,341 |      54 |  1.24% |

Estos resultados corresponden a una ejecución concreta del dataset incluido en el proyecto.

---

## Análisis por categoría

El pipeline también genera métricas por categoría de comercio:

| Categoría   | Operaciones | Fraudes |  Tasa |
| ----------- | ----------: | ------: | ----: |
| Grocery     |       1,944 |      39 | 2.01% |
| Food        |       2,093 |      35 | 1.67% |
| Travel      |       1,989 |      29 | 1.46% |
| Electronics |       1,923 |      24 | 1.25% |
| Clothing    |       2,050 |      24 | 1.17% |

Estas métricas permiten utilizar SQL como una capa analítica sobre los datos procesados.

---

# 📝 Logging

El pipeline registra información tanto en:

```text
Consola
```

como en:

```text
registro_fraudes.log
```

El logging permite visualizar:

* Inicio de cada etapa.
* Cantidad de registros extraídos.
* Resultados de las validaciones.
* Registros eliminados.
* Cantidad de registros procesados.
* Creación de las estructuras SQLite.
* Resultados de las consultas analíticas.
* Errores durante la ejecución.

---

# 🐳 Docker

El proyecto incluye:

```text
Dockerfile
docker-compose.yml
```

Esto permite ejecutar el pipeline en un entorno reproducible.

Desde el directorio del proyecto:

```cmd
docker compose up --build
```

---

# 🐍 Ejecución local

Requisitos:

* Python 3.11 o compatible.
* Pip.

Crear un entorno virtual:

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

Ejecutar el pipeline:

```cmd
python etl_pipeline.py
```

Al finalizar se generará:

```text
fraud_warehouse.db
registro_fraudes.log
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

Este proyecto demuestra conocimientos prácticos en:

```text
ETL
│
├── Extract
├── Transform
└── Load

Data Engineering
│
├── Data Quality
├── Feature Engineering
├── Data Validation
└── Logging

Data Analytics
│
├── SQL
├── Aggregations
├── Analytical Views
└── Fraud Metrics
```

---

# ⚠️ Limitaciones

Este proyecto está diseñado como una implementación educativa y de portafolio.

Actualmente:

* El origen de datos es un archivo CSV.
* El almacenamiento utiliza SQLite.
* El pipeline se ejecuta manualmente.
* No existe procesamiento incremental.
* No existe orquestación externa.
* Las validaciones corresponden a reglas implementadas dentro del pipeline.

---

# 🚀 Próximas mejoras

Como evolución futura del proyecto podrían incorporarse:

* Tests automatizados.
* Procesamiento incremental.
* Orquestación mediante Airflow o Prefect.
* Almacenamiento en PostgreSQL.
* Formatos columnares como Parquet.
* Mayor cantidad de métricas analíticas.
* Dashboard para visualización de resultados.
* Validaciones automatizadas más extensas.

---

# 🎯 Objetivo dentro del portafolio

Este proyecto corresponde al **primer nivel del portafolio de Data Engineering**.

Su propósito es demostrar los fundamentos necesarios para construir un pipeline:

```text
Datos crudos
     ↓
Validación
     ↓
Transformación
     ↓
Almacenamiento
     ↓
Análisis
```

Los proyectos posteriores incorporan progresivamente mayor complejidad en calidad de datos, análisis, transformación e integración con otras tecnologías.
