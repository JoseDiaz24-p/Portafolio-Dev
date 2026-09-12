# 🍫 Cacau Prime Trace — Food Supply Chain & Traceability System

Sistema integral de trazabilidad y cadena de custodia para la industria alimentaria basado en un esquema de datos relacional de producción y logística (Cacau Prime Foods). La plataforma implementa autenticación robusta mediante tokens JWT y control de acceso basado en roles (**RBAC**), permitiendo la auditoría pública de lotes y la gestión operativa restringida en tiempo real.

---

## 🚀 Arquitectura y Tecnologías

### **Backend (API RESTful)**
* **Python & Django REST Framework (DRF):** Endpoints desacoplados para la gestión de lotes y checkpoints logísticos.
* **MySQL:** Base de datos relacional con integridad referencial, índices optimizados y transacciones atómicas (`transaction.atomic`).
* **Django SimpleJWT:** Autenticación stateless mediante tokens portadores (Bearer Tokens) con verificación criptográfica PBKDF2.
* **Django Management Commands:** Scripting automatizado (`load_cacau_data.py`) para ingestión y normalización de datasets analíticos hacia el modelo relacional.
* **CORS Headers:** Configuración de cabeceras seguras para comunicación cross-origin con el cliente.

### **Frontend (SPA)**
* **React + Vite:** Renderizado reactivo, modular y de alto rendimiento.
* **Axios:** Cliente HTTP con interceptores y manejo de tokens en cabeceras de autorización.
* **Lucide React:** Iconografía vectorial interactiva para estados de trazabilidad.
* **CSS3 Custom Variables:** Interfaz en modo oscuro adaptativo con jerarquía visual enfocada en auditoría de datos.

---

## 🔐 Control de Acceso Basado en Roles (RBAC)

La plataforma aplica un flujo de seguridad donde la vista del dashboard se adapta estrictamente a las credenciales provistas:

| Rol | Permisos | Capacidades en la Interfaz |
| :--- | :--- | :--- |
| **Auditor / Calidad** (`is_staff: false`) | Solo Lectura (`GET`) | Búsqueda por SKU/Lote, inspección de métricas físico-químicas (temperatura, humedad) y visualización de la línea de tiempo. |
| **Operador / Admin** (`is_staff: true`) | Lectura y Escritura (`GET`, `POST`) | Acceso a métricas + Creación de nuevos lotes y emisión de checkpoints en la cadena de frío/custodia. |

---

## 🗄️ Modelo de Datos (MySQL)

* **`Batch` (`traceability_batch`):**
  * `batch_id` (PK, VARCHAR): Código alfanumérico único del lote (ej. `CP-BATCH-00001`).
  * `product`: Nombre o SKU derivado del catálogo maestro de productos.
  * `origin_farm`: Planta o instalación productora de origen.
  * `destination`: Centro logístico de distribución de destino.
  * `harvest_date`: Fecha de fabricación/cosecha.
  * `current_status`: Estado actual del lote (`En tránsito`, `Completado`, `En proceso`).
  * `temperature_avg` / `humidity_avg`: Métricas críticas de conservación.
  * `quality_cert`: Estándares de calidad y certificaciones (UTZ, ISO 22000, Fairtrade).

* **`Checkpoint` (`traceability_checkpoint`):**
  * `batch_id` (FK): Relación muchos a uno con eliminación en cascada.
  * `stage`: Etapa operativa del ciclo de vida (mezclado, análisis, aduana, entrega).
  * `location`: Ubicación geográfica o instalación de la inspección.
  * `operator`: Nombre o identificador del operador/auditor responsable.
  * `date`: Fecha de registro de la etapa.
  * `notes`: Bitácora y observaciones de auditoría.

---

## 🛠️ Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone [https://github.com/JoseDiaz24-p/Portafolio-Dev.git](https://github.com/JoseDiaz24-p/Portafolio-Dev.git)
cd Portafolio-Dev/FullStack/01-cacau-prime-trace