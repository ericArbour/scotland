from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DistilleryViewSet

router = DefaultRouter()
router.register(r"distilleries", DistilleryViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
