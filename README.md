# 👨‍💻 José Díaz Orellana

## Analista Programador | Data Engineering & Data Analytics

Analista Programador titulado de **INACAP**, con formación práctica en desarrollo
de software, APIs, bases de datos relacionales y desarrollo web.

Actualmente estoy orientando mi perfil hacia **Data Engineering y Data Analytics**,
con especial interés en la construcción de pipelines ETL, procesamiento y
transformación de datos, SQL, bases de datos y soluciones reproducibles.

Mi experiencia previa en desarrollo Full Stack con **Python/Django, React, APIs
REST, MySQL y Oracle** complementa este enfoque y me permite comprender el flujo
completo desde una aplicación hasta sus fuentes de datos.

---

## 🎯 Perfil profesional

Actualmente enfocado en desarrollar soluciones y proyectos relacionados con:

- 🐍 Python y procesamiento de datos
- 🔄 Procesos ETL
- 🧹 Limpieza y calidad de datos
- 🗄️ SQL y bases de datos relacionales
- 📊 Data Analytics
- 🐼 Pandas
- 🐳 Docker y Docker Compose
- 🏛️ Oracle PL/SQL
- 🔗 APIs y servicios web
- 🤖 Integración experimental de IA con datos

---

# 🛠️ Tecnologías

### Data Engineering & Analytics

- Python
- Pandas
- SQL
- ETL
- Data Quality
- Feature Engineering
- SQL Analytics
- Segmentación de datos

### Bases de datos

- Oracle / PL/SQL
- SQLite
- MySQL

### Desarrollo de software

- Python / Django
- JavaScript
- React
- HTML5
- CSS3
- APIs REST

### DevOps & herramientas

- Docker
- Docker Compose
- Git
- GitHub
- Logging

### IA aplicada

- Google Gemini API
- Function Calling
- Integración de modelos de lenguaje con fuentes de datos

> La integración con IA tiene carácter experimental y complementario.
> El foco principal del portfolio es Data Engineering, Data Analytics y
> bases de datos.

---

# 📂 Proyectos destacados

| Proyecto | Área | Tecnologías |
|---|---|---|
| [01 — Credit Card Fraud Pipeline](./pipelines/01-pipeline-fraude_tarjetas_de_credito/) | ETL / Data Quality | Python, Pandas, SQLite, SQL, Docker |
| [02 — BNPL Analytics Pipeline](./pipelines/02-pipeline-bnpl/) | ETL / Analytics | Python, Pandas, SQLite, SQL, Docker |
| [03 — Fintech Data Experience Agent](./pipelines/03-pipeline-fintech-data-experience-agent/) | ETL / Analytics / AI | Python, Pandas, SQLite, Docker, Gemini |
| [Oracle PL/SQL E-Commerce](./databases/01-oracle-plsql-ecommerce/) | Database Engineering | Oracle, PL/SQL |
| [Frontend](./frontend/) | Desarrollo Web | React, JavaScript, HTML, CSS |

---

# 📊 Proyecto 01 — Credit Card Fraud Detection Pipeline

Pipeline ETL desarrollado en Python para procesar transacciones financieras,
realizar controles de calidad, transformar los datos y almacenarlos en SQLite.

### Principales conceptos

- Extracción desde CSV
- Limpieza de datos
- Validación de registros
- Detección y tratamiento de duplicados
- Validación de valores numéricos
- Feature Engineering
- Clasificación por rangos de monto
- Persistencia en SQLite
- Vistas SQL analíticas
- Logging del proceso ETL

### Flujo

```text
CSV
 ↓
Extracción
 ↓
Validación y Data Quality
 ↓
Limpieza
 ↓
Transformación
 ↓
Feature Engineering
 ↓
SQLite
 ↓
Vistas SQL
 ↓
Métricas analíticas