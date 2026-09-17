# 🚀 Data Engineering & Data Analytics Portfolio

Repositorio profesional orientado al desarrollo de soluciones de **Data Engineering, Data Analytics y bases de datos**, utilizando Python, SQL, procesos ETL, calidad de datos, análisis y arquitecturas reproducibles mediante Docker.

El portafolio reúne proyectos prácticos que muestran una progresión desde procesos ETL y análisis SQL hasta integraciones experimentales con inteligencia artificial.

---

## 👨‍💻 Sobre el portafolio

El objetivo de este repositorio es demostrar conocimientos prácticos en:

* Desarrollo de pipelines ETL.
* Limpieza y transformación de datos.
* Validación y calidad de datos.
* Feature Engineering.
* Análisis mediante SQL.
* Bases de datos relacionales.
* Automatización y reproducibilidad con Docker.
* Logging y manejo de errores.
* Integración experimental de IA con datos.

Los proyectos están organizados progresivamente según su complejidad.

---

## 🛠️ Stack Tecnológico

### Lenguajes

* Python 3.11
* SQL
* Oracle PL/SQL
* SQLite
* MySQL

### Data Engineering & Analytics

* Pandas
* NumPy
* ETL
* Data Quality
* Feature Engineering
* SQL Analytics
* Funciones de ventana
* Segmentación de datos

### Bases de Datos

* Oracle
* SQLite
* MySQL

### DevOps & Herramientas

* Docker
* Docker Compose
* Git
* GitHub Actions
* Logging

### Integración con IA

* Google Gemini API
* Function Calling
* Integración de modelos de lenguaje con fuentes de datos

---

# 📂 Estructura del Repositorio

```text
Portafolio-Dev/
│
├── pipelines/
│   │
│   ├── 01-pipeline-fraude_tarjetas_de_credito/
│   │   └── ETL de transacciones y análisis de fraude
│   │
│   ├── 02-pipeline-bnpl/
│   │   └── ETL, calidad de datos y análisis de riesgo crediticio
│   │
│   └── 03-pipeline-fintech-data-experience-agent/
│       └── ETL, analytics e integración experimental con IA
│
├── databases/
│   │
│   └── 01-oracle-plsql-ecommerce/
│       └── Desarrollo de bases de datos y PL/SQL
│
└── frontend/
    └── Proyectos frontend complementarios
```

---

# 📊 Proyectos

## 01 — Credit Card Fraud Detection Pipeline

**Nivel:** Fundamental

Pipeline ETL desarrollado en Python para procesar transacciones financieras, aplicar controles de calidad, enriquecer los datos y almacenarlos en SQLite.

### Tecnologías

* Python
* Pandas
* SQLite
* SQL
* Docker
* Logging

### Conceptos demostrados

* Extracción desde CSV.
* Limpieza de datos.
* Eliminación de duplicados.
* Feature Engineering.
* Clasificación por rangos de monto.
* Carga en SQLite.
* Vistas SQL analíticas.
* Logging del proceso ETL.

El proyecto sirve como base para demostrar los fundamentos de construcción de pipelines de datos.

---

## 02 — BNPL Credit Risk Pipeline

**Nivel:** Intermedio

Pipeline orientado al procesamiento de información relacionada con clientes de servicios **Buy Now Pay Later (BNPL)**.

El proyecto incorpora controles de calidad, transformación de datos, segmentación por edad y generación de métricas analíticas mediante SQL.

### Tecnologías

* Python
* Pandas
* SQLite
* SQL
* Docker
* Logging

### Conceptos demostrados

* Data Quality.
* Validación de registros.
* Eliminación de duplicados.
* Feature Engineering.
* Discretización de variables.
* Transformación de indicadores de riesgo.
* Métricas analíticas mediante SQL.
* Persistencia en SQLite.

Este proyecto representa una evolución respecto al pipeline de fraude, incorporando mayor transformación y análisis de datos.

---

## 03 — Fintech Data Experience & AI Agent

**Nivel:** Avanzado / Experimental

Pipeline de datos aplicado al análisis de clientes de una fintech, incorporando una integración experimental con inteligencia artificial.

El proyecto procesa datos de clientes mediante ETL, genera métricas de comportamiento y segmentación, almacena los resultados en SQLite y permite que un agente basado en Gemini consulte información mediante **Function Calling**.

### Flujo principal

```text
CSV
 │
 ▼
ETL
 │
 ├── Limpieza
 ├── Validación
 ├── Feature Engineering
 └── Segmentación
 │
 ▼
SQLite
 │
 ├── SQL Analytics
 │
 ▼
Gemini
 │
 └── Function Calling
       │
       ▼
   Perfil del cliente
```

### Tecnologías

* Python
* Pandas
* SQLite
* SQL
* Docker
* Gemini API
* Function Calling

### Conceptos demostrados

* ETL modular.
* Data Quality.
* Feature Engineering.
* Métricas de clientes.
* SQL Window Functions.
* Persistencia en SQLite.
* Consultas parametrizadas.
* Integración de LLM con datos.
* Function Calling.
* Manejo básico de errores y reintentos.

> La integración con IA es de carácter experimental y complementario. El foco principal del proyecto continúa siendo Data Engineering y Data Analytics.

---

# 🗄️ Bases de Datos

## Oracle PL/SQL E-Commerce

Proyecto orientado al desarrollo y administración de una base de datos utilizando Oracle PL/SQL.

Incluye componentes relacionados con:

* Procedimientos almacenados.
* Triggers.
* Lógica PL/SQL.
* Auditoría.
* Modelado y persistencia de información.

Este proyecto complementa el portafolio de Data Engineering mostrando conocimientos relacionados con bases de datos y programación del lado del servidor.

---

# 🌐 Frontend

El repositorio también conserva proyectos frontend desarrollados anteriormente.

Estos proyectos funcionan como complemento del portafolio y permiten demostrar experiencia previa en desarrollo de interfaces y aplicaciones web.

El foco principal actual del repositorio se encuentra en:

```text
Data Engineering
        +
Data Analytics
        +
Databases
```

mientras que los proyectos frontend permanecen como experiencia complementaria.

---

# 🧪 Calidad y reproducibilidad

Los proyectos de datos buscan mantener una estructura reproducible mediante:

* Archivos `requirements.txt`.
* Entornos virtuales.
* Docker.
* Docker Compose.
* Variables de entorno para credenciales.
* Logging.
* Validaciones de datos.
* Separación entre datos, transformación y almacenamiento.

Los archivos sensibles, bases de datos generadas y logs locales se mantienen fuera del control de versiones cuando corresponde.

---

# 🐳 Docker

Los pipelines que incorporan Docker pueden ejecutarse dentro de contenedores para reducir diferencias entre entornos.

Ejemplo:

```cmd
docker compose up --build
```

La configuración específica de cada proyecto se encuentra dentro de su respectivo directorio.

---

# 🔄 Progresión del Portafolio

La organización actual busca mostrar una evolución progresiva:

```text
01 — ETL Fundamentals
        │
        ▼
02 — Data Quality & Analytics
        │
        ▼
03 — Advanced ETL + Analytics + AI
        │
        ▼
Oracle PL/SQL
```

Cada proyecto aborda problemas diferentes y agrega nuevos conceptos técnicos.

---

# 🎯 Objetivo profesional

Este repositorio representa mi evolución como desarrollador hacia el área de:

**Data Engineering + Data Analytics**

con especial interés en:

* Construcción de pipelines de datos.
* Automatización de procesos ETL.
* SQL y bases de datos.
* Calidad y transformación de datos.
* Análisis de información.
* Arquitecturas reproducibles.
* Integración de herramientas modernas de datos.

La integración con IA se mantiene como una línea experimental complementaria al trabajo de datos.

---

# 📌 Estado del portafolio

| Área               | Estado          |
| ------------------ | --------------- |
| Python             | 🟢              |
| ETL                | 🟢              |
| Pandas             | 🟢              |
| SQL                | 🟢              |
| SQLite             | 🟢              |
| Oracle PL/SQL      | 🟢              |
| Data Quality       | 🟢              |
| Docker             | 🟢              |
| Data Analytics     | 🟢              |
| Git / GitHub       | 🟢              |
| Integración con IA | 🟡 Experimental |

---

## 📈 Próximos objetivos

Algunas áreas que pueden incorporarse progresivamente al portafolio:

* Orquestación de pipelines.
* Procesamiento incremental.
* PostgreSQL.
* Parquet.
* DuckDB.
* Data Warehouses.
* Cloud Data Engineering.
* Dashboards y visualización.
* Testing automatizado para pipelines.
* Mayor observabilidad de procesos ETL.
