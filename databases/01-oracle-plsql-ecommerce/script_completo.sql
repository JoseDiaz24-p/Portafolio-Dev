



-- =============================================================================
-- SECCIÓN 1: DDL - MODELO RELACIONAL E ÍNDICES B-TREE
-- =============================================================================

CREATE TABLE clientes (
    id_cliente           VARCHAR2(50) CONSTRAINT pk_clientes PRIMARY KEY,
    id_unico_cliente     VARCHAR2(50) NOT NULL,
    codigo_postal        NUMBER(8),
    ciudad               VARCHAR2(100),
    estado_provincia     VARCHAR2(10)
);

CREATE TABLE productos (
    id_producto          VARCHAR2(50) CONSTRAINT pk_productos PRIMARY KEY,
    categoria            VARCHAR2(100),
    longitud_nombre      NUMBER(5),
    longitud_descripcion NUMBER(5),
    cantidad_fotos       NUMBER(5),
    peso_gramos          NUMBER(10,2),
    largo_cm             NUMBER(10,2),
    alto_cm              NUMBER(10,2),
    ancho_cm             NUMBER(10,2)
);

CREATE TABLE ordenes (
    id_orden                VARCHAR2(50) CONSTRAINT pk_ordenes PRIMARY KEY,
    id_cliente              VARCHAR2(50) NOT NULL CONSTRAINT fk_ordenes_clientes REFERENCES clientes(id_cliente),
    estado_orden            VARCHAR2(25) NOT NULL,
    fecha_compra            TIMESTAMP,
    fecha_aprobacion        TIMESTAMP,
    fecha_despacho          TIMESTAMP,
    fecha_entrega           TIMESTAMP,
    fecha_estimada_entrega  TIMESTAMP
);

CREATE TABLE items_orden (
    id_orden            VARCHAR2(50) NOT NULL,
    numero_item         NUMBER(4) NOT NULL,
    id_producto         VARCHAR2(50) NOT NULL,
    id_vendedor         VARCHAR2(50),
    fecha_limite_envio  TIMESTAMP,
    precio              NUMBER(10,2) NOT NULL,
    valor_flete         NUMBER(10,2) DEFAULT 0,
    CONSTRAINT pk_items_orden PRIMARY KEY (id_orden, numero_item),
    CONSTRAINT fk_item_orden FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden),
    CONSTRAINT fk_item_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE pagos_orden (
    id_orden        VARCHAR2(50) NOT NULL,
    secuencia_pago  NUMBER(4) NOT NULL,
    tipo_pago       VARCHAR2(30) NOT NULL,
    cuotas          NUMBER(4) DEFAULT 1,
    monto_pago      NUMBER(10,2) NOT NULL,
    CONSTRAINT pk_pagos_orden PRIMARY KEY (id_orden, secuencia_pago),
    CONSTRAINT fk_pago_orden FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden)
);

-- Índices B-Tree para optimización de JOINs y filtros
CREATE INDEX idx_ordenes_cliente ON ordenes(id_cliente);
CREATE INDEX idx_items_producto  ON items_orden(id_producto);
CREATE INDEX idx_items_vendedor  ON items_orden(id_vendedor);
CREATE INDEX idx_pagos_orden     ON pagos_orden(id_orden);
CREATE INDEX idx_ordenes_estado  ON ordenes(estado_orden);


-- =============================================================================
-- SECCIÓN 2: CONSULTAS ANALÍTICAS Y CAPA SEMÁNTICA (NIVEL 1)
-- =============================================================================

-- Ejercicio 1.1: Clientes y sus Métricas de Compra (> $500)
SELECT 
    c.id_cliente,
    c.ciudad,
    c.estado_provincia,
    COUNT(DISTINCT o.id_orden) AS total_ordenes,
    SUM(i.precio) AS monto_total_gastado
FROM clientes c
INNER JOIN ordenes o     ON c.id_cliente = o.id_cliente
INNER JOIN items_orden i ON o.id_orden = i.id_orden
GROUP BY c.id_cliente, c.ciudad, c.estado_provincia
HAVING SUM(i.precio) > 500
ORDER BY monto_total_gastado DESC;

-- Ejercicio 1.2: Rendimiento por Categoría de Producto (Top 10)
SELECT 
    p.categoria,
    COUNT(i.numero_item)      AS unidades_vendidas,
    SUM(i.precio)             AS total_ingresos_ventas,
    ROUND(AVG(i.valor_flete), 2) AS costo_promedio_flete
FROM productos p
INNER JOIN items_orden i ON p.id_producto = i.id_producto
INNER JOIN ordenes o     ON i.id_orden = o.id_orden
WHERE p.categoria IS NOT NULL
GROUP BY p.categoria
ORDER BY total_ingresos_ventas DESC
FETCH FIRST 10 ROWS ONLY;

-- Ejercicio 1.3: Detección de Órdenes Sin Pago Registrado (Anti-Join)
SELECT 
    o.id_orden, 
    o.estado_orden, 
    o.fecha_compra
FROM ordenes o
LEFT JOIN pagos_orden p ON o.id_orden = p.id_orden
WHERE p.id_orden IS NULL;

-- Ejercicio 1.4: Métodos de Pago Preferidos por Estado
SELECT 
    c.estado_provincia,
    p.tipo_pago,
    COUNT(*) AS cantidad_usos
FROM clientes c
INNER JOIN ordenes o     ON c.id_cliente = o.id_cliente
INNER JOIN pagos_orden p ON o.id_orden = p.id_orden
GROUP BY c.estado_provincia, p.tipo_pago
ORDER BY c.estado_provincia ASC, cantidad_usos DESC;

