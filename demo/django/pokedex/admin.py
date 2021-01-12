from django.contrib import admin

# Register your models here.
from pokedex.models import Specie


@admin.register(Specie)
class SpecieAdmin(admin.ModelAdmin):
    pass
