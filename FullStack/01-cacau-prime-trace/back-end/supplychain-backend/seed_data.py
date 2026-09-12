import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from traceability.models import Batch, Checkpoint

# Crear Lote 1
b1, created = Batch.objects.get_or_create(
    batch_id="CACAU-2024-001",
    defaults={
        "product": "Cacao Criollo Fino de Aroma",
        "origin_farm": "Hacienda San José, Ecuador",
        "destination": "Planta Procesadora São Paulo, Brasil",
        "harvest_date": "2024-02-15",
        "current_status": "En tránsito",
        "temperature_avg": 18.5,
        "humidity_avg": 62.0,
        "quality_cert": "UTZ / Fairtrade Certified"
    }
)

if created:
    Checkpoint.objects.create(
        batch=b1,
        stage="Cosecha y Fermentación",
        date="2024-02-15",
        location="Hacienda San José, Ecuador",
        operator="Carlos Mendoza (Agricultor)",
        status="Completado",
        notes="Fermentación completada en 6 días en cajas de madera de laurel."
    )
    Checkpoint.objects.create(
        batch=b1,
        stage="Secado y Control de Humedad",
        date="2024-02-23",
        location="Centro de Secado Guayas",
        operator="Elena Suárez (Control Calidad)",
        status="Completado",
        notes="Humedad reducida al 7%. Lote aprobado para exportación."
    )

# Crear Lote 2
b2, created = Batch.objects.get_or_create(
    batch_id="CACAU-2024-002",
    defaults={
        "product": "Cacao Forastero Premium",
        "origin_farm": "Cooperativa Cacaotera Bahía, Brasil",
        "destination": "Centro de Distribución Buenos Aires",
        "harvest_date": "2024-01-10",
        "current_status": "Completado",
        "temperature_avg": 21.2,
        "humidity_avg": 65.4,
        "quality_cert": "Organic Seal IFOAM"
    }
)

if created:
    Checkpoint.objects.create(
        batch=b2,
        stage="Cosecha Inicial",
        date="2024-01-10",
        location="Bahía, Brasil",
        operator="Marcos Lucena",
        status="Completado",
        notes="Cosecha seleccionada bajo estándar orgánico."
    )

print("¡Datos insertados exitosamente en MySQL!")