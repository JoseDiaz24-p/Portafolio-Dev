# 🗄️ Database Architecture & Enterprise Backend Logic

Colección de esquemas relacionales, modelado dimensional/transaccional, optimización de motores de bases de datos mediante índices y desarrollo de lógica de negocio transaccional del lado del servidor (Oracle PL/SQL, SQL ANSI, procedimientos almacenados y triggers de auditoría).

---

## 📂 Módulos y Proyectos

| Directorio | Motor | Componentes Clave | Descripción |
| :--- | :--- | :--- | :--- |
| **[01-oracle-plsql-ecommerce](./01-oracle-plsql-ecommerce)** | Oracle Database (19c/21c) | DDL, Triggers, Packages, ETL, Índices B-Tree | Modelo transaccional E-Commerce (Olist) con control de integridad referencial, auditoría reactiva y capas analíticas PL/SQL. |

---

## 🛠️ Competencias Técnicas Demostradas

* **Modelado Relacional e Integridad:** Diseño de esquemas en 3FN con claves compuestas, restricciones de integridad referencial (`FK`) y reglas de consistencia de negocio.
* **Programación Procedural (PL/SQL):** Implementación de procedimientos almacenados, funciones deterministas, cursores explícitos parametrizados y paquetes modulares (`PACKAGE SPEC` & `BODY`).
* **Automatización y Auditoría:** Disparadores (`BEFORE` / `AFTER UPDATE`) para validaciones temporales y registro histórico de cambios en tablas de auditoría.
* **Optimización y Rendimiento:** Creación de índices B-Tree estratégicos sobre columnas de alta cardinalidad y filtros de búsqueda masiva.
* **Procesos Batch & ETL Internos:** Procedimientos con SQL dinámico (`EXECUTE IMMEDIATE`) para poblamiento automatizado de Data Marts analíticos agregados.