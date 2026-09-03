/* =============================================================================
   E-COMMERCE DATA ENGINEERING & BUSINESS LOGIC WITH ORACLE PL/SQL
   Motor: Oracle Database 19c / 21c XE
   Dataset: Olist E-Commerce
============================================================================= */

-- 1. LIMPIEZA PREVIA (Opcional)
/*
DROP TABLE auditoria_ordenes CASCADE CONSTRAINTS;
DROP TABLE log_ordenes_caras CASCADE CONSTRAINTS;
DROP TABLE dm_resumen_mensual CASCADE CONSTRAINTS;
DROP TABLE pagos_orden CASCADE CONSTRAINTS;
DROP TABLE items_orden CASCADE CONSTRAINTS;
DROP TABLE ordenes CASCADE CONSTRAINTS;
DROP TABLE productos CASCADE CONSTRAINTS;
DROP TABLE clientes CASCADE CONSTRAINTS;
*/

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

-- Ejercicio 1.5: Vista Analítica Consolidada de Pedidos
CREATE OR REPLACE VIEW v_detalle_pedidos_completo AS
SELECT 
    o.id_orden,
    o.estado_orden,
    c.ciudad,
    c.estado_provincia,
    COUNT(i.numero_item)                  AS total_items,
    NVL(SUM(i.precio), 0)                 AS costo_total_productos,
    NVL(SUM(i.valor_flete), 0)            AS costo_total_flete,
    NVL(SUM(i.precio + i.valor_flete), 0) AS monto_final_total
FROM ordenes o
INNER JOIN clientes c    ON o.id_cliente = c.id_cliente
LEFT JOIN items_orden i  ON o.id_orden = i.id_orden
GROUP BY o.id_orden, o.estado_orden, c.ciudad, c.estado_provincia;


-- =============================================================================
-- SECCIÓN 3: PROCEDIMIENTOS ALMACENADOS Y LÓGICA TRANSACCIONAL (NIVEL 2)
-- =============================================================================

-- Ejercicio 2.1: Procedimiento de Cancelación de Orden
CREATE OR REPLACE PROCEDURE sp_cancelar_orden (
    p_id_orden IN VARCHAR2,
    p_mensaje  OUT VARCHAR2
) AS
    v_estado ordenes.estado_orden%TYPE;
BEGIN
    SELECT estado_orden INTO v_estado
    FROM ordenes
    WHERE id_orden = p_id_orden;

    IF v_estado = 'delivered' THEN
        p_mensaje := 'ERROR: La orden ya fue entregada.';
    ELSIF v_estado = 'canceled' THEN
        p_mensaje := 'AVISO: La orden ya estaba cancelada.';
    ELSE
        UPDATE ordenes
        SET estado_orden = 'canceled'
        WHERE id_orden = p_id_orden;
        
        COMMIT;
        p_mensaje := 'ÉXITO: Orden cancelada.';
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_mensaje := 'ERROR: La orden especificada no existe.';
END sp_cancelar_orden;
/

-- Ejercicio 2.2: Procedimiento para Registro de Nuevo Pago
CREATE OR REPLACE PROCEDURE sp_registrar_pago (
    p_id_orden    IN VARCHAR2,
    p_tipo_pago   IN VARCHAR2,
    p_cuotas      IN NUMBER,
    p_monto_pago  IN NUMBER,
    p_resultado   OUT VARCHAR2
) AS
    v_siguiente_secuencia NUMBER;
    v_dummy NUMBER;
BEGIN
    IF p_monto_pago <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'El monto del pago debe ser mayor a cero.');
    END IF;

    -- Validar existencia previa de la orden
    SELECT 1 INTO v_dummy FROM ordenes WHERE id_orden = p_id_orden;

    SELECT NVL(MAX(secuencia_pago), 0) + 1 INTO v_siguiente_secuencia
    FROM pagos_orden
    WHERE id_orden = p_id_orden;

    INSERT INTO pagos_orden (id_orden, secuencia_pago, tipo_pago, cuotas, monto_pago)
    VALUES (p_id_orden, v_siguiente_secuencia, p_tipo_pago, p_cuotas, p_monto_pago);

    COMMIT;
    p_resultado := 'ÉXITO: Pago registrado con secuencia ' || v_siguiente_secuencia;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20002, 'La orden especificada no existe en la base de datos.');
END sp_registrar_pago;
/

-- Ejercicio 2.3: Procedimiento con Parámetros OUT (KPIs de Cliente)
CREATE OR REPLACE PROCEDURE sp_kpis_cliente (
    p_id_cliente    IN VARCHAR2,
    p_total_ordenes OUT NUMBER,
    p_total_gastado OUT NUMBER,
    p_ciudad        OUT VARCHAR2
) AS
BEGIN
    -- Valida cliente (lanza NO_DATA_FOUND si no existe)
    SELECT ciudad INTO p_ciudad
    FROM clientes
    WHERE id_cliente = p_id_cliente;

    SELECT 
        COUNT(DISTINCT o.id_orden), 
        NVL(SUM(p.monto_pago), 0)
    INTO p_total_ordenes, p_total_gastado
    FROM ordenes o
    LEFT JOIN pagos_orden p ON o.id_orden = p.id_orden
    WHERE o.id_cliente = p_id_cliente;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        p_total_ordenes := 0;
        p_total_gastado := 0;
        p_ciudad        := 'CLIENTE NO ENCONTRADO';
END sp_kpis_cliente;
/

-- Ejercicio 2.4: Auditoría Batch de Órdenes Caras con Cursor Explícito
CREATE TABLE log_ordenes_caras (
    id_orden       VARCHAR2(50),
    total_monto    NUMBER(10,2),
    fecha_registro DATE
);

CREATE OR REPLACE PROCEDURE sp_auditar_ordenes_caras AS
    CURSOR c_ordenes_caras IS
        SELECT id_orden, SUM(monto_pago) AS total
        FROM pagos_orden
        GROUP BY id_orden
        HAVING SUM(monto_pago) > 1500;
        
    v_registro c_ordenes_caras%ROWTYPE;
BEGIN
    OPEN c_ordenes_caras;
    LOOP
        FETCH c_ordenes_caras INTO v_registro;
        EXIT WHEN c_ordenes_caras%NOTFOUND;
        
        INSERT INTO log_ordenes_caras (id_orden, total_monto, fecha_registro)
        VALUES (v_registro.id_orden, v_registro.total, SYSDATE);
    END LOOP;
    CLOSE c_ordenes_caras;
    COMMIT;
END sp_auditar_ordenes_caras;
/

-- Ejercicio 2.5: Actualización Masiva y Uso de SQL%ROWCOUNT
CREATE OR REPLACE PROCEDURE sp_actualizar_categoria_nula (
    p_categoria_reemplazo IN VARCHAR2,
    p_filas_modificadas   OUT NUMBER
) AS
BEGIN
    UPDATE productos
    SET categoria = p_categoria_reemplazo
    WHERE categoria IS NULL;
    
    p_filas_modificadas := SQL%ROWCOUNT;
    COMMIT;
END sp_actualizar_categoria_nula;
/


-- =============================================================================
-- SECCIÓN 4: TRIGGERS, INTEGRIDAD Y PACKAGES COMPLETOS (NIVEL 3)
-- =============================================================================

-- Ejercicio 3.1: Trigger de Auditoría de Transición de Estados
CREATE TABLE auditoria_ordenes (
    id_log          NUMBER GENERATED ALWAYS AS IDENTITY,
    id_orden        VARCHAR2(50),
    estado_anterior VARCHAR2(25),
    estado_nuevo    VARCHAR2(25),
    fecha           DATE,
    usuario         VARCHAR2(50)
);

CREATE OR REPLACE TRIGGER trg_auditar_estado_orden
AFTER UPDATE OF estado_orden ON ordenes
FOR EACH ROW
BEGIN
    IF :OLD.estado_orden <> :NEW.estado_orden OR (:OLD.estado_orden IS NULL AND :NEW.estado_orden IS NOT NULL) THEN
        INSERT INTO auditoria_ordenes (id_orden, estado_anterior, estado_nuevo, fecha, usuario)
        VALUES (:OLD.id_orden, :OLD.estado_orden, :NEW.estado_orden, SYSDATE, USER);
    END IF;
END;
/

-- Ejercicio 3.2: Trigger de Validación Temporal de Fechas de Despacho
CREATE OR REPLACE TRIGGER trg_validar_fecha_entrega
BEFORE UPDATE OF fecha_entrega ON ordenes
FOR EACH ROW
BEGIN
    IF :NEW.fecha_entrega IS NOT NULL AND :NEW.fecha_entrega < NVL(:NEW.fecha_compra, :OLD.fecha_compra) THEN
        RAISE_APPLICATION_ERROR(-20005, 'Fecha de entrega inválida. No puede ser menor a la fecha de compra.');
    END IF;
END;
/

-- Ejercicio 3.3: Package de Gestión de Órdenes
CREATE OR REPLACE PACKAGE pkg_gestion_pedidos AS
    FUNCTION fn_monto_total_orden(p_id_orden VARCHAR2) RETURN NUMBER;
    PROCEDURE sp_cambiar_estado(p_id_orden VARCHAR2, p_nuevo_estado VARCHAR2);
END pkg_gestion_pedidos;
/

CREATE OR REPLACE PACKAGE BODY pkg_gestion_pedidos AS

    FUNCTION fn_monto_total_orden(p_id_orden VARCHAR2) RETURN NUMBER IS
        v_total NUMBER := 0;
    BEGIN
        SELECT NVL(SUM(precio + valor_flete), 0) INTO v_total
        FROM items_orden
        WHERE id_orden = p_id_orden;
        RETURN v_total;
    END fn_monto_total_orden;

    PROCEDURE sp_cambiar_estado(p_id_orden VARCHAR2, p_nuevo_estado VARCHAR2) IS
    BEGIN
        IF p_nuevo_estado NOT IN ('shipped', 'delivered', 'canceled') THEN
            RAISE_APPLICATION_ERROR(-20006, 'Estado inválido. Solo se permite shipped, delivered o canceled.');
        END IF;

        UPDATE ordenes
        SET estado_orden = p_nuevo_estado
        WHERE id_orden = p_id_orden;
        
        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20007, 'La orden especificada no existe.');
        END IF;
        COMMIT;
    END sp_cambiar_estado;

END pkg_gestion_pedidos;
/

-- Ejercicio 3.4: Package de Reportería Financiera
CREATE OR REPLACE PACKAGE pkg_reportes_financieros AS
    FUNCTION fn_promedio_gasto_estado(p_estado_provincia VARCHAR2) RETURN NUMBER;
    PROCEDURE sp_top_productos_categoria(p_categoria VARCHAR2);
END pkg_reportes_financieros;
/

CREATE OR REPLACE PACKAGE BODY pkg_reportes_financieros AS

    FUNCTION fn_promedio_gasto_estado(p_estado_provincia VARCHAR2) RETURN NUMBER IS
        v_promedio NUMBER := 0;
    BEGIN
        SELECT NVL(AVG(p.monto_pago), 0) INTO v_promedio
        FROM clientes c
        INNER JOIN ordenes o     ON c.id_cliente = o.id_cliente
        INNER JOIN pagos_orden p ON o.id_orden = p.id_orden
        WHERE c.estado_provincia = p_estado_provincia;
        RETURN v_promedio;
    END fn_promedio_gasto_estado;

    PROCEDURE sp_top_productos_categoria(p_categoria VARCHAR2) IS
        CURSOR c_top_productos IS
            SELECT * FROM (
                SELECT i.id_producto, COUNT(*) AS unidades
                FROM items_orden i
                INNER JOIN productos p ON i.id_producto = p.id_producto
                WHERE p.categoria = p_categoria
                GROUP BY i.id_producto
                ORDER BY COUNT(*) DESC
            ) WHERE ROWNUM <= 5;
    BEGIN
        DBMS_OUTPUT.PUT_LINE('--- TOP 5 PRODUCTOS DE LA CATEGORÍA: ' || p_categoria || ' ---');
        FOR reg IN c_top_productos LOOP
            DBMS_OUTPUT.PUT_LINE('ID Producto: ' || reg.id_producto || ' | Unidades Vendidas: ' || reg.unidades);
        END LOOP;
    END sp_top_productos_categoria;

END pkg_reportes_financieros;
/

-- Ejercicio 3.5: Procedimiento ETL de Carga para Data Mart con Truncate Dinámico
CREATE TABLE dm_resumen_mensual (
    anio_mes      VARCHAR2(7),
    total_ventas  NUMBER,
    total_ordenes NUMBER,
    total_fletes  NUMBER
);

CREATE OR REPLACE PROCEDURE sp_cargar_resumen_mensual AS
BEGIN
    -- DDL dinámico obligatorio para TRUNCATE en PL/SQL
    EXECUTE IMMEDIATE 'TRUNCATE TABLE dm_resumen_mensual';

    INSERT INTO dm_resumen_mensual (anio_mes, total_ventas, total_ordenes, total_fletes)
    SELECT 
        TO_CHAR(o.fecha_compra, 'YYYY-MM') AS anio_mes,
        NVL(SUM(i.precio), 0)             AS total_ventas,
        COUNT(DISTINCT o.id_orden)        AS total_ordenes,
        NVL(SUM(i.valor_flete), 0)        AS total_fletes
    FROM ordenes o
    LEFT JOIN items_orden i ON o.id_orden = i.id_orden
    WHERE o.fecha_compra IS NOT NULL
    GROUP BY TO_CHAR(o.fecha_compra, 'YYYY-MM');
    
    COMMIT;
END sp_cargar_resumen_mensual;
/