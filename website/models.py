from django.db import models

# Create your models here.

from django.core import serializers
#from FruitLabs.settings import MEDIA_ROOT


class Product(models.Model):
    name = models.CharField(max_length=120)
    price = models.IntegerField()
    quantity = models.IntegerField(default=1)
    text = models.TextField(max_length=10000, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    total = models.IntegerField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # write_json()

    def __str__(self):
        return self.name


class Pastilla(models.Model):
    name = models.CharField(max_length=120)
    price = models.IntegerField()
    text = models.TextField(max_length=10000, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class HandMadeComponents(models.Model):
    name = models.CharField(max_length=120)
    image = models.ImageField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class PastillaComponents(models.Model):
    name = models.CharField(max_length=120)
    image = models.ImageField(blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


def write_json():
    with open("file.json", "w") as out:
        json_serializer = serializers.get_serializer('json')()
        json_serializer.serialize(Product.objects.all(), stream=out)