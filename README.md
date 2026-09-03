# 🚀 Data Engineering & Backend Portfolio
[![CI Pipelines Validation](https://github.com/JoseDiaz24-p/Portafolio-Dev/actions/workflows/ci.yml/badge.svg)](https://github.com/JoseDiaz24-p/Portafolio-Dev/actions/workflows/ci.yml)

Repositorio profesional enfocado en el diseño, desarrollo y orquestación de flujos de datos (ETL/ELT), modelado dimensional/relacional, calidad de datos y arquitecturas reproducibles mediante contenedores Docker.

---

## 🛠️ Stack Tecnológico

* **Lenguajes & Scripting:** Python 3.11, SQL (Oracle PL/SQL, SQLite, MySQL).
* **Data Processing:** Pandas, NumPy.
* **Contenedores & DevOps:** Docker, Docker Compose, Git.
* **Prácticas de Software:** Logging estructurado dual (consola + persistente UTF-8), control de idempotencia, Data Quality Gates y manejo defensivo de excepciones.

---

## 📂 Estructura del Repositorio

```text
Portafolio-Dev/
│
├── pipelines/                                 # Pipelines ETL y Analítica de Datos
│   ├── 01-pipeline-fraude_tarjetas_de_credito/ # Detección de fraude financiero con Docker y vistas SQL
│   └── 02-pipeline-bnpl/                      # Ingesta, discretización etaria y scoring de mora BNPL
│
├── databases/                                 # Arquitectura, persistencia y administración de BD
│   └── oracle-sql/                            # Stored Procedures, Triggers y auditoría PL/SQL
│
├── backend/                                   # Servicios, endpoints y lógica de negocio
│
└── frontend/                                  # Interfaces visuales y dashboards de soporte