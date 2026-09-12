from django.urls import path
from .views import BatchListCreateAPIView, CheckpointCreateAPIView, CustomTokenObtainPairView

urlpatterns = [
    path('batches/', BatchListCreateAPIView.as_view(), name='batch-list-create'),
    path('batches/<str:batch_id>/checkpoints/', CheckpointCreateAPIView.as_view(), name='checkpoint-create'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]