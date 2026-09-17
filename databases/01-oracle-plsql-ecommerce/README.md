# 🛒 E-Commerce Database Engineering with Oracle SQL

Proyecto de **modelado relacional y análisis de datos transaccionales**
utilizando **Oracle Database** y SQL.

El proyecto utiliza un modelo orientado a comercio electrónico para representar
clientes, productos, órdenes, ítems de órdenes y pagos, implementando
integridad referencial, claves primarias, claves compuestas e índices B-Tree.

Además, incorpora consultas SQL orientadas al análisis de comportamiento de
clientes, rendimiento de productos, métodos de pago y detección de
inconsistencias en las órdenes.

---

## 🎯 Objetivo

El objetivo del proyecto es demostrar conocimientos prácticos en:

- Modelado de bases de datos relacionales
- Oracle SQL
- Diseño de tablas y relaciones
- Integridad referencial
- Claves primarias y foráneas
- Claves primarias compuestas
- Índices B-Tree
- Consultas SQL analíticas
- Agregaciones y métricas de negocio
- Detección de datos inconsistentes mediante SQL

El proyecto complementa los pipelines de Data Engineering del portfolio,
aportando experiencia específica en **bases de datos relacionales y SQL**.

---

# 📐 Modelo Relacional

El modelo está compuesto por las siguientes entidades principales:

```text
CLIENTES
    │
    │ 1:N
    ▼
ORDENES
    │
    ├────────────── 1:N ──────────────► ITEMS_ORDEN
    │                                      │
    │                                      │ N:1
    │                                      ▼
    │                                  PRODUCTOS
    │
    └────────────── 1:N ──────────────► PAGOS_ORDEN