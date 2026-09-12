from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Batch, Checkpoint
from .serializers import BatchSerializer, CheckpointSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Personaliza el payload devuelto al hacer login con JWT."""
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        
        # Determinamos el rol según los permisos del usuario de Django
        if self.user.is_superuser or self.user.is_staff:
            data['role'] = 'admin'
        else:
            data['role'] = 'auditor'

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class BatchListCreateAPIView(APIView):
    def get(self, request):
        # prefetch_related ejecuta 1 sola query optimizada para checkpoints evitando el problema N+1
        batches = Batch.objects.prefetch_related('checkpoints').all().order_by('-created_at')

        search = request.query_params.get('search', None)
        if search:
            batches = (
                batches.filter(batch_id__icontains=search) |
                batches.filter(product__icontains=search) |
                batches.filter(origin_farm__icontains=search)
            )

        serializer = BatchSerializer(batches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BatchSerializer(data=request.data)
        if serializer.is_valid():
            batch = serializer.save()

            # Primer checkpoint de origen automático
            Checkpoint.objects.create(
                batch=batch,
                stage="Registro de Origen",
                date=batch.harvest_date,
                location=batch.origin_farm,
                operator="Administrador",
                status="Completado",
                notes="Inicio de la cadena de custodia en origen."
            )

            return Response(BatchSerializer(batch).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckpointCreateAPIView(APIView):
    def post(self, request, batch_id):
        batch = get_object_or_404(Batch, batch_id=batch_id)

        data = request.data.copy()
        serializer = CheckpointSerializer(data=data)

        if serializer.is_valid():
            serializer.save(batch=batch)
            return Response(BatchSerializer(batch).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)