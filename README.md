# José Díaz Orellana

## Analista Programador | Data Engineering & Data Analytics

Analista Programador titulado de INACAP, con formación en desarrollo de software, bases de datos y servicios web.

Actualmente estoy orientando mi perfil hacia **Data Engineering y Data Analytics**, fortaleciendo conocimientos en Python, ETL, SQL, calidad de datos, bases de datos relacionales, Docker y análisis de información.

Este repositorio reúne proyectos personales y académicos que muestran mi evolución desde el desarrollo de software hacia el trabajo con datos.

---

## 🎯 Perfil

Mi objetivo profesional es desarrollarme como **Data Engineer / Data Analyst Junior**, construyendo una base sólida en:

- Python para procesamiento y transformación de datos
- Procesos ETL
- Limpieza y validación de datos
- SQL y bases de datos relacionales
- Análisis exploratorio y métricas
- Automatización de procesos
- Docker y reproducibilidad
- Git y GitHub
- Integración de APIs
- Exploración de herramientas de Inteligencia Artificial

Mi experiencia previa en desarrollo Full Stack complementa este enfoque, especialmente en Python/Django, React, APIs REST y bases de datos.

---

# 📂 Proyectos

## 01. Pipeline ETL — Detección y análisis de fraude

**Python · Pandas · SQLite · Docker**

Pipeline ETL orientado al procesamiento de transacciones bancarias.

El proyecto implementa:

- Extracción de datos desde CSV
- Validación de estructura y columnas requeridas
- Conversión y validación de tipos de datos
- Detección de duplicados y valores nulos
- Validación de montos y registros de fraude
- Eliminación de registros inválidos
- Creación de variables derivadas
- Carga de información en SQLite
- Creación de vistas SQL para análisis
- Registro de ejecución mediante logging
- Ejecución mediante Docker

**Objetivo:** desarrollar un primer pipeline reproducible aplicando conceptos fundamentales de Data Engineering y Data Quality.

[Ver proyecto →](./pipelines/01-pipeline-fraude_tarjetas_de_credito/Readme.md)

---

## 02. Pipeline ETL — Análisis de riesgo BNPL

**Python · Pandas · SQLite · Docker**

Segundo pipeline orientado al procesamiento y análisis de información relacionada con operaciones BNPL (Buy Now, Pay Later).

El proyecto trabaja con un dataset de **50.000 registros** y permite practicar un flujo ETL más completo.

Incluye:

- Extracción de datos desde CSV
- Validación de columnas requeridas
- Conversión de variables numéricas
- Control de duplicados
- Control de valores nulos
- Validación de rangos
- Validación de estados de pago
- Segmentación por edad
- Clasificación analítica del nivel de crédito
- Transformación de estados de pago
- Carga en SQLite
- Creación de vistas analíticas
- Métricas por edad, proveedor y categoría
- Logging
- Ejecución mediante Docker

Las métricas generadas son **descriptivas y analíticas**. El proyecto no implementa un modelo predictivo ni toma decisiones crediticias.

**Objetivo:** avanzar desde un ETL básico hacia procesos con mayor volumen, validaciones y análisis de negocio.

[Ver proyecto →](./pipelines/02-pipeline-bnpl/README.MD)

---

## 03. Pipeline Fintech + Analytics + Agente experimental

**Python · Pandas · SQLite · SQL · Docker · Gemini API**

Proyecto orientado a combinar procesamiento de datos, análisis SQL e integración experimental con Inteligencia Artificial.

El proyecto implementa:

- Pipeline ETL modular
- Limpieza y validación de datos
- Eliminación de registros inválidos y duplicados
- Creación de métricas de negocio
- Segmentación de clientes
- Persistencia en SQLite
- Índices para consultas
- Consultas analíticas mediante SQL
- Herramienta de acceso a perfiles de clientes
- Integración experimental mediante Gemini Function Calling
- Manejo de errores HTTP y disponibilidad de la API
- Configuración mediante variables de entorno
- Ejecución mediante Docker

La integración con IA tiene un carácter **experimental y complementario**. No se utiliza para decisiones financieras ni pretende representar experiencia profesional avanzada en Inteligencia Artificial.

**Objetivo:** explorar cómo herramientas de IA pueden integrarse con pipelines y fuentes de datos estructuradas.

[Ver proyecto →](./pipelines/03-pipeline-fintech-data-experience-agent/README.md)

---

# 🗄️ Bases de Datos

## Oracle SQL — E-Commerce

**Oracle · SQL · Modelado Relacional**

Proyecto enfocado en el diseño y consulta de una base de datos relacional para un escenario de comercio electrónico.

Incluye:

- Modelado de entidades relacionadas
- Claves primarias
- Claves foráneas
- Claves primarias compuestas
- Integridad referencial
- Índices B-Tree
- Consultas con `INNER JOIN`
- Consultas con `LEFT JOIN`
- Agregaciones
- `GROUP BY`
- `HAVING`
- `ORDER BY`
- `COUNT`
- `SUM`
- `AVG`
- `DENSE_RANK`
- Análisis de órdenes, clientes, productos y pagos

El proyecto representa mi trabajo práctico con **Oracle SQL y modelado relacional**.

Como evolución futura se contempla incorporar procedimientos, funciones, triggers, paquetes PL/SQL, vistas y otros componentes orientados a una solución más completa.

[Ver proyecto →](./databases/01-oracle-plsql-ecommerce/README.md)

---

# 🌐 Desarrollo Frontend

Además de mi orientación actual hacia datos, mantengo proyectos realizados durante mi formación y experiencia en desarrollo web.

## Antojitos

**React · JavaScript · HTML · CSS · Vite**

Aplicación frontend desarrollada con React.

[Ver proyecto →](./frontend/Antojitos/)

## Rokami

**React · JavaScript · HTML · CSS · Vite**

Proyecto frontend desarrollado como parte de mi experiencia con aplicaciones web.

[Ver proyecto →](./frontend/Rokami/)

## Rick & Morty Explorer

**React · JavaScript · API REST**

Aplicación frontend que consume una API para mostrar información de personajes.

[Ver proyecto →](./frontend/rick-and-morty-explorer/)

---

# ⚙️ Integración Continua

El repositorio utiliza **GitHub Actions** para validar los pipelines principales.

Actualmente el workflow:

1. Ejecuta el entorno de GitHub Actions.
2. Configura Docker Buildx.
3. Construye y ejecuta el Pipeline 01 mediante Docker Compose.
4. Construye y ejecuta el Pipeline 02 mediante Docker Compose.
5. Utiliza el código de salida de los contenedores para determinar si la ejecución fue correcta.

Esto permite comprobar automáticamente que los pipelines principales pueden construirse y ejecutarse en un entorno limpio.

---

# 🧰 Tecnologías

### Data Engineering / Analytics

- Python
- Pandas
- SQL
- SQLite
- Oracle
- ETL
- Data Quality
- Logging
- Docker
- Docker Compose

### Desarrollo

- JavaScript
- React
- HTML5
- CSS3
- Django
- REST APIs
- JSON

### Herramientas

- Git
- GitHub
- GitHub Actions
- VS Code

### Exploración

- Integración de APIs de Inteligencia Artificial
- Gemini Function Calling

---

# 📚 Conocimientos que estoy fortaleciendo

Actualmente estoy profundizando principalmente en:

```text
Python
   ↓
Pandas
   ↓
ETL + Data Quality
   ↓
SQL
   ↓
Bases de Datos
   ↓
Docker
   ↓
Data Analytics
   ↓
Orquestación y herramientas de Data Engineering