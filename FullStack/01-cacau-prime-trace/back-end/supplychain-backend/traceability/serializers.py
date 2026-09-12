from rest_framework import serializers
from .models import Batch, Checkpoint

class CheckpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkpoint
        fields = [
            'id',
            'stage',
            'date',
            'location',
            'operator',
            'status',
            'notes',
            'created_at'
        ]


class BatchSerializer(serializers.ModelSerializer):
    checkpoints = CheckpointSerializer(many=True, read_only=True)
    id = serializers.CharField(source='batch_id', required=True)

    class Meta:
        model = Batch
        fields = [
            'id',
            'product',
            'origin_farm',
            'destination',
            'harvest_date',
            'current_status',
            'temperature_avg',
            'humidity_avg',
            'quality_cert',
            'checkpoints',
            'created_at'
        ]

    def create(self, validated_data):
        batch_id = validated_data.pop('batch_id')
        batch = Batch.objects.create(batch_id=batch_id, **validated_data)
        return batch