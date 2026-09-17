# MACHBANK — Fintech Data Experience & AI Agent

**Proyecto 03 — Data Engineering + Data Analytics + Integración experimental con IA**

Pipeline de datos orientado al análisis de clientes de una fintech, utilizando un proceso ETL en Python para transformar información transaccional y generar métricas de comportamiento y segmentación.

Como componente adicional, el proyecto incorpora un agente basado en Gemini con **Function Calling**, capaz de consultar información de clientes directamente desde una base de datos SQLite y utilizar esos datos para generar un diagnóstico estructurado.

> **Nota:** La integración con IA es una extensión experimental del proyecto. El objetivo principal sigue siendo demostrar conocimientos de **Data Engineering y Data Analytics**.

---

## Descripción

El proyecto implementa un flujo completo:

```text
Dataset CSV
    │
    ▼
Extracción
    │
    ▼
Limpieza y validación
    │
    ▼
Feature Engineering
    │
    ▼
Segmentación de clientes
    │
    ▼
SQLite
    │
    ├──────────────► Consultas SQL analíticas
    │
    ▼
Gemini + Function Calling
    │
    ▼
Diagnóstico del cliente
```

El pipeline procesa un dataset de clientes de una billetera digital y genera una tabla analítica denominada:

```text
dim_customers_ltv
```

La información procesada posteriormente puede ser consultada por el agente mediante una herramienta controlada.

---

## Arquitectura

### Flujo ETL

```text
digital_wallet_ltv_dataset.csv
            │
            ▼
     run_pipeline.py
            │
            ▼
FintechTransformadorDatos
            │
      ┌─────┴─────┐
      ▼           ▼
 Limpieza     Métricas
      │           │
      └─────┬─────┘
            ▼
      Segmentación
            │
            ▼
        SQLite
            │
            ▼
   mach_analytics.db
```

### Flujo del agente

```text
Usuario
   │
   ▼
run_agent.py
   │
   ▼
Gemini
   │
   │ Function Calling
   ▼
get_customer_profile()
   │
   ▼
SQLite
   │
   ▼
Perfil del cliente
   │
   ▼
Gemini
   │
   ▼
Diagnóstico estructurado
```

---

## Estructura del proyecto

```text
03-pipeline-fintech-data-experience-agent/
│
├── .dockerignore
├── .env.example
├── Dockerfile
├── README.md
├── docker-compose.yml
├── requirements.txt
├── run_agent.py
├── run_pipeline.py
│
├── data/
│   └── digital_wallet_ltv_dataset.csv
│
├── database/
│   └── mach_analytics.db
│
└── src/
    ├── ai_agent/
    │   └── database_tool.py
    │
    ├── analytics/
    │   └── customer_kpis.sql
    │
    └── etl/
        └── transformador.py
```

`mach_analytics.db` es generado por el pipeline y no debe versionarse en Git.

---

## Tecnologías

* Python 3.11
* Pandas
* SQLite
* SQL
* Docker
* Docker Compose
* Google Gemini API
* Python Dotenv

---

# 1. ETL y transformación

El proceso principal se encuentra en:

```text
run_pipeline.py
```

Este módulo ejecuta las tres etapas principales del pipeline:

### Extracción

Carga el dataset:

```text
data/digital_wallet_ltv_dataset.csv
```

El dataset utilizado contiene **7.000 registros**.

---

### Limpieza y validación

La clase:

```python
FintechTransformadorDatos
```

realiza diferentes controles sobre los datos.

Entre ellos:

* Validación de columnas requeridas.
* Conversión de columnas numéricas.
* Eliminación de valores nulos.
* Validación de `Active_Days > 0`.
* Validación de `Customer_ID`.
* Eliminación de clientes duplicados.

También registra la cantidad de registros eliminados durante el proceso.

---

### Feature Engineering

Se generan nuevas métricas para facilitar el análisis de comportamiento de los clientes.

#### Daily Spend Rate

```text
Total_Spent / Active_Days
```

Representa el gasto promedio asociado a cada día activo del cliente.

#### Ticket Spread

```text
Max_Transaction_Value - Min_Transaction_Value
```

Permite observar la diferencia entre la transacción de mayor y menor valor.

---

## Segmentación de clientes

El pipeline calcula los percentiles 75 de:

```text
Total_Spent
Active_Days
```

A partir de estos valores se asigna un segmento.

Los segmentos implementados son:

```text
VIP_ALTO_CONSUMO
COMPRADOR_DE_BAJA_FRECUENCIA
USUARIO_REGULAR
USUARIO_ESTANDAR
```

Esta segmentación es una regla analítica basada en percentiles del dataset; **no corresponde a un modelo de Machine Learning**.

---

# 2. Almacenamiento

Los datos procesados se almacenan en SQLite:

```text
database/mach_analytics.db
```

La tabla principal es:

```text
dim_customers_ltv
```

Además, el pipeline crea índices para facilitar las consultas sobre:

```text
Customer_ID
Customer_Segment
```

---

# 3. Capa analítica SQL

El archivo:

```text
src/analytics/customer_kpis.sql
```

contiene consultas orientadas al análisis de clientes.

Se utilizan funciones de ventana de SQL como:

```sql
AVG(...) OVER(PARTITION BY ...)
```

y:

```sql
DENSE_RANK() OVER(...)
```

Esto permite comparar el gasto de un cliente con el promedio de su ubicación y obtener su posición relativa dentro de ella.

Ejemplo conceptual:

```text
Cliente
   │
   ├── Ubicación
   │
   ├── Total gastado
   │
   ├── Promedio de gasto de la ubicación
   │
   ├── Diferencia respecto al promedio
   │
   └── Ranking dentro de la ubicación
```

La consulta actualmente devuelve los primeros 20 resultados ordenados por ubicación y ranking.

> El archivo SQL funciona como una capa analítica independiente y actualmente no forma parte de la ejecución automática de `run_pipeline.py`.

---

# 4. Integración con Gemini

El archivo:

```text
run_agent.py
```

implementa la integración con el modelo configurado:

```text
gemini-3.6-flash
```

La API Key se obtiene mediante una variable de entorno:

```text
GEMINI_API_KEY
```

La clave no debe almacenarse directamente en el código.

---

## Function Calling

Una de las partes principales del proyecto es la utilización de **Function Calling**.

El modelo dispone de una herramienta denominada:

```text
get_customer_profile
```

Esta herramienta recibe:

```text
customer_id
```

y consulta la información correspondiente en SQLite.

El flujo es:

```text
Usuario
   │
   ▼
Gemini
   │
   │ solicita información
   ▼
get_customer_profile()
   │
   ▼
SQLite
   │
   ▼
Datos del cliente
   │
   ▼
Gemini
   │
   ▼
Respuesta final
```

La consulta SQL utiliza parámetros:

```python
WHERE Customer_ID = ?
```

para evitar construir consultas directamente utilizando valores proporcionados por el usuario.

---

# 5. Diagnóstico generado por el agente

Después de obtener los datos desde SQLite, Gemini utiliza la información recuperada para generar un análisis estructurado.

El agente está configurado para organizar la respuesta en aspectos como:

1. Perfil del cliente.
2. Métricas principales.
3. Segmento.
4. Observaciones.
5. Recomendaciones de soporte.

Las recomendaciones generadas por el agente tienen carácter **informativo y de apoyo al análisis**.

El sistema no ejecuta decisiones financieras automáticamente.

---

## Ejemplo

Una ejecución del pipeline produjo un perfil como:

```text
Customer_ID: cust_0000
Age: 54
Income_Level: Low
Location: Urban

Total_Transactions: 192
Total_Spent: 3,213,385.73
Active_Days: 140

Customer_Segment: USUARIO_ESTANDAR
```

Estos datos son recuperados desde SQLite mediante Function Calling antes de generar el diagnóstico.

---

# 6. Manejo básico de errores

La integración con la API contempla reintentos para determinados errores HTTP transitorios, incluyendo:

```text
429
503
```

También se manejan errores relacionados con:

* conexión
* timeout
* respuestas inesperadas
* errores de SQLite
* ausencia del dataset
* ausencia de la base de datos

---

# 7. Seguridad

El proyecto utiliza variables de entorno para gestionar credenciales.

Archivo utilizado durante el desarrollo:

```text
.env
```

Plantilla:

```text
.env.example
```

El archivo `.env` se encuentra excluido mediante `.gitignore` y `.dockerignore`.

### Buenas prácticas aplicadas

* No almacenar API Keys directamente en el código.
* No versionar `.env`.
* No versionar bases SQLite generadas.
* No versionar logs.
* Utilizar consultas SQL parametrizadas.
* Utilizar `.env.example` como plantilla de configuración.

> Nunca publiques una API Key real en GitHub, README, capturas de pantalla o documentación.

---

# 8. Ejecución local

Desde el directorio del proyecto:

```cmd
cd pipelines\03-pipeline-fintech-data-experience-agent
```

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

Crear el archivo `.env` a partir de `.env.example` y configurar:

```text
GEMINI_API_KEY=TU_API_KEY
```

### Ejecutar ETL

```cmd
python run_pipeline.py
```

Esto genera:

```text
database\mach_analytics.db
```

### Ejecutar agente

```cmd
python run_agent.py
```

---

# 9. Ejecución con Docker

El proyecto incluye:

```text
Dockerfile
docker-compose.yml
```

Desde la raíz del repositorio:

```cmd
docker compose -f pipelines\03-pipeline-fintech-data-experience-agent\docker-compose.yml up --build
```

El contenedor ejecuta:

```text
ETL
  ↓
SQLite
  ↓
AI Agent
```

La base de datos generada se mantiene mediante el volumen:

```text
./database:/app/database
```

---

# 10. Limitaciones actuales

Este proyecto está diseñado como proyecto de portafolio y demostración técnica, no como una plataforma financiera de producción.

Actualmente:

* El origen de datos es un archivo CSV.
* El almacenamiento utiliza SQLite.
* El ETL se ejecuta manualmente.
* La segmentación utiliza reglas basadas en percentiles.
* No existe un modelo de Machine Learning.
* El agente dispone de una herramienta principal para consultar perfiles.
* Las consultas analíticas SQL se encuentran en un archivo independiente.
* Las recomendaciones generadas por IA no constituyen decisiones financieras automatizadas.

---

# 11. Próximas mejoras

Algunas mejoras posibles para una evolución futura:

### Data Engineering

* Incorporar orquestación con Airflow o Prefect.
* Incorporar procesamiento incremental.
* Utilizar Parquet.
* Migrar SQLite hacia PostgreSQL.
* Incorporar validaciones automatizadas de calidad de datos.
* Agregar pruebas unitarias para el ETL.

### Data Analytics

* Crear más KPIs de clientes.
* Incorporar análisis temporal.
* Agregar cohortes de clientes.
* Crear dashboards.
* Analizar retención y comportamiento.

### IA

* Incorporar nuevas herramientas de consulta.
* Agregar métricas agregadas al agente.
* Mejorar validación de respuestas.
* Incorporar un flujo de observabilidad para las llamadas al modelo.
* Integrar el agente con una aplicación de análisis.

---

# 12. Objetivo del proyecto

Este proyecto busca demostrar la integración de diferentes componentes de un flujo moderno de datos:

```text
Python
   +
Pandas
   +
ETL
   +
Data Quality
   +
Feature Engineering
   +
SQL
   +
SQLite
   +
Docker
   +
Gemini Function Calling
```

El foco principal está en **Data Engineering y Data Analytics**, mientras que la integración con IA representa una extensión experimental para explorar cómo un modelo de lenguaje puede interactuar de forma controlada con una capa de datos.

---

## Estado del proyecto

**ETL:** Funcional
**Data Quality:** Funcional
**SQLite:** Funcional
**SQL Analytics:** Funcional
**Docker:** Funcional
**Gemini Function Calling:** Funcional
**AI Agent:** Experimental

**Proyecto 03 de Portafolio — Data Engineering + Data Analytics**
