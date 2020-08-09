from django.contrib import admin

# Register your models here.

from .models import Product, HandMadeComponents, PastillaComponents, Pastilla

@admin.register(Product)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'text', 'image')

@admin.register(HandMadeComponents)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')

@admin.register(PastillaComponents)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'image')

@admin.register(Pastilla)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'text', 'image')
