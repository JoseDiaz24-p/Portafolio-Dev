from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from traceability.models import Batch, Checkpoint
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = 'Siembra usuarios y lotes demo para el entorno de produccion'

    def handle(self, *args, **options):
        # 1. Crear usuarios demo si no existen
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@cacauprime.com', 'admin123')
            self.stdout.write(self.style.SUCCESS("Usuario 'admin' creado."))

        if not User.objects.filter(username='auditor').exists():
            user = User.objects.create_user('auditor', 'auditor@cacauprime.com', 'auditor123')
            user.is_staff = False
            user.save()
            self.stdout.write(self.style.SUCCESS("Usuario 'auditor' creado."))

        # 2. Si ya hay lotes, no duplicar
        if Batch.objects.exists():
            self.stdout.write(self.style.WARNING("Ya existen lotes en la base de datos."))
            return

        # 3. Datos de prueba representativos de Cacau Prime
        farms = ['Hacienda San José', 'Fazenda Ilhéus', 'Cooperativa BioCacau', 'Agropecuaria Pará', 'Plantação Bahia']
        destinations = ['Centro Logístico São Paulo', 'Puerto de Santos', 'Distribuidora Curitiba', 'Terminal Rio de Janeiro']
        certs = ['UTZ Certified', 'Fairtrade', 'Rainforest Alliance', 'Orgánico IBD', 'ISO 22000']
        statuses = ['En tránsito', 'Completado', 'En proceso']

        batches_to_create = []
        base_date = date.today() - timedelta(days=60)

        for i in range(1, 101):
            batch_id = f"CP-BATCH-{str(i).zfill(5)}"
            b = Batch(
                batch_id=batch_id,
                product=f"Lote Especial Granos Seleccionados #{1000 + i}",
                origin_farm=random.choice(farms),
                destination=random.choice(destinations),
                harvest_date=base_date + timedelta(days=i % 45),
                current_status=random.choice(statuses),
                temperature_avg=round(random.uniform(18.0, 24.5), 1),
                humidity_avg=round(random.uniform(55.0, 72.0), 1),
                quality_cert=random.choice(certs)
            )
            batches_to_create.append(b)

        Batch.objects.bulk_create(batches_to_create)
        self.stdout.write(self.style.SUCCESS("100 lotes creados."))

        # 4. Crear checkpoints para cada lote
        checkpoints_to_create = []
        stages = [
            ('Cosecha y Secado', 'Finca de origen', 'Operador Agrícola'),
            ('Control de Calidad y Fermentación', 'Laboratorio Central', 'Auditor de Calidad'),
            ('Transporte Primario', 'Ruta Logística', 'Conductor de Carga'),
            ('Recepción en Centro de Acopio', 'Planta de Distribución', 'Jefe de Bodega')
        ]

        for b in Batch.objects.all():
            for stage, loc, op in stages:
                checkpoints_to_create.append(
                    Checkpoint(
                        batch=b,
                        stage=stage,
                        location=f"{loc} ({b.origin_farm})",
                        operator=op,
                        notes="Parámetros de humedad y temperatura conformes a la normativa técnica."
                    )
                )

        Checkpoint.objects.bulk_create(checkpoints_to_create)
        self.stdout.write(self.style.SUCCESS("Checkpoints generados correctamente."))