from django.db import models


class Distillery(models.Model):
    name = models.CharField(max_length=25)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Whisky(models.Model):
    name = models.CharField(max_length=50)
    rating = models.IntegerField(choices=[(i, i) for i in range(101)])
    distillery = models.ForeignKey(
        Distillery, on_delete=models.CASCADE, related_name="whiskies"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
