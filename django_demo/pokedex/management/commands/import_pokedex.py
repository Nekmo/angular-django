"""Import Pokedex data.
"""
from django.core.management.base import BaseCommand, CommandError
from pokedex.import_pokedex import import_all

class Command(BaseCommand):
    help = globals()['__doc__']

    def handle(self, *args, **options):
        import_all()
