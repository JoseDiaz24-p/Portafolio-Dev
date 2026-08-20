# E-Commerce Data Engineering & Business Logic with Oracle PL/SQL

Este proyecto implementa una arquitectura relacional completa para la gestión, análisis y auditoría de transacciones de un comercio electrónico a gran escala utilizando **Oracle Database**, **SQL Avanzado** y **PL/SQL**.

El desarrollo se construyó a partir del dataset transaccional público de **Olist E-Commerce**, aplicando normalización de datos, integridad referencial, índices de optimización, procedimientos almacenados con lógica de negocio, triggers reactivos, paquetes modulares y procesos ETL.

---

## 🛠️ Tecnologías y Herramientas
* **Motor de Base de Datos:** Oracle Database (19c/21c Express Edition)
* **Lenguajes:** SQL / Oracle PL/SQL
* **Herramienta de Gestión:** Oracle SQL Developer
* **Estructura de Datos:** Relacional (5 tablas interconectadas con claves primarias y foráneas)

---

## 📊 Modelo de Datos Relacional

El esquema está compuesto por 5 entidades principales normalizadas:
1. **`clientes`**: Información demográfica y geográfica de compradores.
2. **`productos`**: Catálogo de productos, categorías y dimensiones físicas.
3. **`ordenes`**: Encabezado del pedido con marcas de tiempo (compra, despacho, entrega).
4. **`items_orden`**: Detalle transaccional de productos, precios y costos de flete por pedido.
5. **`pagos_orden`**: Registro de transacciones financieras, métodos de pago y cuotas.

---

## 🚀 Contenido del Repositorio

El código SQL se encuentra organizado en tres niveles de complejidad:

### 1. Consultas Analíticas, Agregaciones y Vistas (Nivel 1)
* Métricas financieras por cliente (gasto acumulado, órdenes únicas).
* Rentabilidad y costos de flete por categoría de producto (`FETCH FIRST N ROWS ONLY`).
* Detección de anomalías operacionales mediante consultas `Anti-Join` (`LEFT JOIN ... WHERE IS NULL`).
* Preferencia de métodos de pago por región geográfica.
* Vista consolidada de pedidos: `v_detalle_pedidos_completo`.

### 2. Lógica Transaccional y Procedimientos Almacenados (Nivel 2)
* **`sp_cancelar_orden`**: Validación de estados de despacho, reversión controlada y manejo de excepciones (`NO_DATA_FOUND`).
* **`sp_registrar_pago`**: Cálculo dinámico del correlativo de pago e inserción parametrizada con control de montos.
* **`sp_kpis_cliente`**: Procedimiento con parámetros `OUT` para integración directa con capas de backend o APIs.
* **`sp_auditar_ordenes_caras`**: Procesamiento por lotes utilizando un **cursor explícito** (`CURSOR`, `LOOP`, `FETCH`) para auditar órdenes de alto valor.
* **`sp_actualizar_categoria_nula`**: Manejo de atributos de cursor implícito (`SQL%ROWCOUNT`) para trazabilidad de modificaciones masivas.

### 3. Triggers, Modularidad y Pipelines ETL (Nivel 3)
* **`trg_auditar_estado_orden`**: Trigger `AFTER UPDATE` para registrar el historial de transiciones de estado, usuario y fecha en la tabla `auditoria_ordenes`.
* **`trg_validar_fecha_entrega`**: Trigger `BEFORE UPDATE` para asegurar la coherencia temporal entre la compra y la entrega (`RAISE_APPLICATION_ERROR`).
* **`pkg_gestion_pedidos`**: Paquete PL/SQL (especificación y body) con funciones de cálculo total y procedimientos de cambio de estado.
* **`pkg_reportes_financieros`**: Paquete modular con cursores parametrizados para reportes ejecutivos.
* **`sp_cargar_resumen_mensual`**: Procedimiento ETL con SQL dinámico (`EXECUTE IMMEDIATE`) para alimentar un Data Mart mensual (`dm_resumen_mensual`).

---

## ⚡ Rendimiento e Índices
Para garantizar tiempos de respuesta óptimos frente a más de 100.000 registros, se implementaron índices B-Tree sobre las claves foráneas y columnas de filtro recurrente:
* `idx_ordenes_cliente`
* `idx_items_producto`
* `idx_items_vendedor`
* `idx_pagos_orden`
* `idx_ordenes_estado`

---

## 💻 Instrucciones de Ejecución
1. Abrir **Oracle SQL Developer** y conectarse a la instancia de base de datos.
2. Ejecutar el script DDL de creación de tablas e índices.
3. Importar los archivos CSV correspondientes respetando el orden de dependencias referenciales (`clientes` -> `productos` -> `ordenes` -> `items_orden` -> `pagos_orden`).
4. Compilar los procedimientos, funciones, triggers y paquetes PL/SQL provistos en el script principal.
