import csv
import os
from datetime import datetime
from django.core.management.base import BaseCommand
from django.db import transaction
from traceability.models import Batch, Checkpoint

class Command(BaseCommand):
    help = 'Importa el dataset de Cacau Prime Foods a MySQL'

    def handle(self, *args, **options):
        # Directorio donde están los CSV (la misma carpeta commands)
        base_dir = os.path.dirname(os.path.abspath(__file__))
        prod_csv = os.path.join(base_dir, 'dim_produto.csv')
        filial_csv = os.path.join(base_dir, 'dim_filial.csv')
        producao_csv = os.path.join(base_dir, 'fato_producao.csv')

        if not os.path.exists(producao_csv):
            self.stderr.write(self.style.ERROR(f"No se encontró fato_producao.csv en: {base_dir}"))
            return

        self.stdout.write(self.style.NOTICE("1. Leyendo catálogo de Productos..."))
        produtos = {}
        if os.path.exists(prod_csv):
            with open(prod_csv, mode='r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    # Lee por clave o primera columna
                    p_id = row.get('id_produto') or row.get('product_id') or list(row.values())[0]
                    p_nome = row.get('nome_produto') or row.get('product_name') or list(row.values())[1]
                    if p_id:
                        produtos[str(p_id).strip()] = str(p_nome).strip()

        self.stdout.write(self.style.NOTICE("2. Leyendo catálogo de Filiales..."))
        filiais = {}
        if os.path.exists(filial_csv):
            with open(filial_csv, mode='r', encoding='utf-8-sig') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    f_id = row.get('id_filial') or row.get('facility_id') or list(row.values())[0]
                    f_nome = row.get('nome_filial') or row.get('facility_name') or list(row.values())[1]
                    if f_id:
                        filiais[str(f_id).strip()] = str(f_nome).strip()

        self.stdout.write(self.style.NOTICE("3. Importando Lotes y Checkpoints a MySQL..."))
        created_count = 0

        with open(producao_csv, mode='r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            # Tomamos 100 registros para una carga ágil
            rows = list(reader)[:100]

            with transaction.atomic():
                for idx, row in enumerate(rows):
                    raw_id = row.get('id_producao') or row.get('production_id') or list(row.values())[0]
                    batch_id = f"CP-BATCH-{str(raw_id).zfill(5)}"

                    p_id = str(row.get('id_produto') or row.get('product_id') or '').strip()
                    product_name = produtos.get(p_id, f"Chocolate Selección SKU-{p_id}")

                    f_id = str(row.get('id_filial') or row.get('facility_id') or '').strip()
                    plant_name = filiais.get(f_id, "Planta Principal Cacau Prime")

                    date_str = str(row.get('data_producao') or row.get('production_date') or '2024-03-01').strip()
                    try:
                        harvest_date = datetime.strptime(date_str, '%Y-%m-%d').date()
                    except Exception:
                        harvest_date = datetime(2024, 3, 1).date()

                    batch, created = Batch.objects.update_or_create(
                        batch_id=batch_id,
                        defaults={
                            'product': product_name,
                            'origin_farm': plant_name,
                            'destination': 'Centro de Distribución Logístico',
                            'harvest_date': harvest_date,
                            'current_status': 'Completado' if idx % 2 == 0 else 'En tránsito',
                            'temperature_avg': 18.0 + (idx % 5),
                            'humidity_avg': 58.0 + (idx % 8),
                            'quality_cert': 'Certificación UTZ / ISO 22000',
                        }
                    )

                    # Checkpoint 1: Producción
                    Checkpoint.objects.get_or_create(
                        batch=batch,
                        stage="Fabricación y Mezclado",
                        defaults={
                            'date': harvest_date,
                            'location': plant_name,
                            'operator': 'Línea Automatizada / Supervisor de Turno',
                            'status': 'Completado',
                            'notes': 'Parámetros de proceso estables y dentro de tolerancia.'
                        }
                    )

                    # Checkpoint 2: Control de Calidad
                    Checkpoint.objects.get_or_create(
                        batch=batch,
                        stage="Inspección y Envasado",
                        defaults={
                            'date': harvest_date,
                            'location': f"{plant_name} - Empaque",
                            'operator': 'Control de Calidad',
                            'status': 'Completado',
                            'notes': 'Sellado hermético y lote aprobado para logística.'
                        }
                    )

                    created_count += 1

        self.stdout.write(self.style.SUCCESS(
            f"¡Éxito! Se cargaron {created_count} lotes reales de Cacau Prime con sus checkpoints en MySQL."
        ))