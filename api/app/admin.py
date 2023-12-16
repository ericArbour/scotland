from django.contrib import admin

# Register your models here.
from .models import Distillery, Whisky

admin.site.register((Distillery, Whisky))
