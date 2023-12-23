from django.db import models

LAT_LON_MAX_DIGITS = 9
LAT_LON_DECIMAL_PLACES = 6


class Distillery(models.Model):
    name = models.CharField(max_length=25)
    latitude = models.DecimalField(
        max_digits=LAT_LON_MAX_DIGITS, decimal_places=LAT_LON_DECIMAL_PLACES
    )
    longitude = models.DecimalField(
        max_digits=LAT_LON_MAX_DIGITS, decimal_places=LAT_LON_DECIMAL_PLACES
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Distilleries"


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

    class Meta:
        verbose_name_plural = "Whiskies"
