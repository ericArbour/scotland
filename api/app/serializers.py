from rest_framework import serializers
from .models import Distillery


class DistillerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Distillery
        fields = ["id", "name", "latitude", "longitude"]
