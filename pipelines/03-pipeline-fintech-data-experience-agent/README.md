# MACHBANK — Fintech Data Experience & Customer Success AI Agent

Pipeline analítico de datos de billetera digital (Fintech) y Agente de Inteligencia Artificial autónomo para **Customer Success y Retención de Clientes**.

El sistema ejecuta un flujo ETL modular para modelar el valor de vida del cliente (LTV) y segmentación transaccional en SQLite, habilitando a un agente impulsado por **Gemini 3.6 Flash** para consultar métricas financieras mediante **Agentic Tool Calling** y emitir diagnósticos estratégicos de negocio.

---

## 🏛️ Arquitectura del Proyecto

```text
  [ digital_wallet_ltv_dataset.csv ]
                 │
                 ▼
     [ ETL Pipeline Modular ] ──► [ SQLite: mach_analytics.db ]
                                                │
                                                ▼
  [ Operaciones ] ◄──► [ Gemini 3.6 Flash ] ◄──► [ database_tool.py ]
```

### Componentes Clave

1. **Pipeline ETL Modular (`src/etl/`):**
   - `extractor.py`: Ingesta controlada de transacciones y perfiles desde datasets de billetera digital.
   - `transformer.py`: Limpieza de datos, imputación, agregaciones monetarias y cálculo de métricas LTV.
   - `loader.py`: Persistencia estructurada en la base analítica relacional.
2. **Capa Analítica (`src/analytics/`):**
   - Modelado analítico y consultas KPI (`customer_kpis.sql`) para evaluar métricas de valor, ticket promedio y frecuencia.
3. **Customer Success Agent (`src/ai_agent/`):**
   - Conexión desacoplada a través de `database_tool.py` mediante *function calling* nativo.
   - Interpretación contextual de métricas financieras (CLV, gasto acumulado, segmentación) para emitir recomendaciones de retención o campañas VIP.

---

## 📁 Estructura de Directorios

```text
fintech-data-experience-agent/
├── data/
│   └── digital_wallet_ltv_dataset.csv     # Dataset analítico de transacciones y LTV
├── database/
│   └── mach_analytics.db                 # Base de datos analítica local (SQLite)
├── src/
│   ├── etl/
│   │   ├── __init__.py
│   │   ├── extractor.py                   # Extracción de datos crudos
│   │   ├── transformer.py                 # Lógica de transformación y cálculo de KPIs
│   │   └── loader.py                      # Persistencia en base relacional
│   ├── analytics/
│   │   └── customer_kpis.sql              # Vistas y métricas analíticas SQL
│   └── ai_agent/
│       ├── __init__.py
│       ├── database_tool.py               # Función controlada de consulta a SQLite
│       └── customer_success_agent.py      # Lógica del modelo y llamadas a herramientas
├── run_pipeline.py                        # Orquestador del pipeline ETL
├── run_agent.py                           # Punto de entrada para interactuar con el Agente AI
├── requirements.txt                       # Dependencias del proyecto
└── README.md                              # Documentación técnica
```

---

## ⚙️ Requisitos Previos

- Python 3.10 o superior.
- Clave de API activa de [Google AI Studio](https://aistudio.google.com/).

---

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio y situarse en la carpeta
```bash
git clone [https://github.com/JoseDiaz24-p/Portafolio-Dev.git](https://github.com/JoseDiaz24-p/Portafolio-Dev.git)
cd Portafolio-Dev/pipelines/03-pipeline-fintech-data-experience-agent
```

### 2. Crear y activar un entorno virtual
```bash
# Windows (CMD)
python -m venv venv
venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con tu clave de API:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

---

## 🚦 Guía de Ejecución

### Paso 1: Ejecutar el Pipeline ETL
Procesa los datos crudos y genera el warehouse analítico local `mach_analytics.db`:

```bash
python run_pipeline.py
```

### Paso 2: Ejecutar el Agente Autónomo
Inicia el agente inteligente para consultar perfiles de clientes y emitir diagnósticos:

```bash
python run_agent.py
```

---

## 📊 Ejemplo de Ejecución y Diagnóstico

**Prompt de prueba:**
> *"Necesito revisar el perfil de 'cust_000054' para ver si califica para beneficios VIP o una campaña especial."*

**Salida en consola:**
```text
[Usuario]: Necesito revisar el perfil de 'cust_000054' para ver si califica para beneficios VIP o una campaña especial.
[Agente]: Consultando base analítica y generando diagnóstico...

[Tool Execution]: Consultando SQLite para customer_id='cust_000054'...

======================================================================
### Diagnóstico de Perfil de Cliente — MACHBANK

1. Perfil Demográfico:
   - Identificador: cust_000054
   - Segmento LTV: Alto Valor (Tier 1)
   - Actividad: Alta frecuencia transaccional

2. Métricas y Comportamiento Financiero:
   - Gasto Total Acumulado: $3,450,000 CLP
   - Ticket Promedio: $48,200 CLP
   - Días Activos Registrados: 180 días

3. Recomendación de Negocio (Customer Success):
   - Calificación: Aprobado para programa de beneficios VIP / MACHBANK Black.
   - Acción sugerida: Despliegue de campaña personalizada con aumento de cupo en línea de crédito y bonificación por compras internacionales.
======================================================================
```

---

## 🛡️ Buenas Prácticas de Ingeniería

- **Gestión Segura de Credenciales:** La autenticación se maneja exclusivamente mediante variables de entorno aisladas (`.env`).
- **Consultas Parametrizadas:** Las llamadas a base de datos en `database_tool.py` están estrictamente parametrizadas para evitar inyección SQL arbitraria por parte del LLM.
- **Tolerancia a Fallos:** Manejo nativo de cabeceras HTTP y lógica de reintentos automáticos (*retry logic*) frente a saturaciones temporales (HTTP 503/429).