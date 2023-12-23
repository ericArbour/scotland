from rest_framework import viewsets
from .models import Distillery
from .serializers import DistillerySerializer


class DistilleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Distillery.objects.all()
    serializer_class = DistillerySerializer
