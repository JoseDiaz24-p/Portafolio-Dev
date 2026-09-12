from django.db import models

class Batch(models.Model):
    batch_id = models.CharField(max_length=50, primary_key=True)
    product = models.CharField(max_length=150)
    origin_farm = models.CharField(max_length=200)
    destination = models.CharField(max_length=200, default='Por definir')
    harvest_date = models.DateField()
    current_status = models.CharField(
        max_length=50,
        default='En proceso',
        choices=[
            ('Registrado', 'Registrado'),
            ('En proceso', 'En proceso'),
            ('En tránsito', 'En tránsito'),
            ('Completado', 'Completado'),
            ('Retenido por Calidad', 'Retenido por Calidad'),
        ]
    )
    temperature_avg = models.DecimalField(max_digits=5, decimal_places=2, default=20.0)
    humidity_avg = models.DecimalField(max_digits=5, decimal_places=2, default=60.0)
    quality_cert = models.CharField(max_length=150, default='En auditoría')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.batch_id} - {self.product}"


class Checkpoint(models.Model):
    # Relación One-to-Many con eliminación en cascada
    batch = models.ForeignKey(Batch, related_name='checkpoints', on_delete=models.CASCADE)
    stage = models.CharField(max_length=150)
    date = models.DateField()
    location = models.CharField(max_length=200)
    operator = models.CharField(max_length=150, default='Operador Logístico')
    status = models.CharField(max_length=50, default='Completado')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date', 'created_at']

    def __str__(self):
        return f"{self.batch.batch_id} - {self.stage}"