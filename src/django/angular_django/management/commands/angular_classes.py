"""Generate Angular 5+ Typescript classes from REST API.
"""
from django.core.management.base import BaseCommand, CommandError

from angular_django.rest_framework import get_api_views
from angular_django.typescript import tpl


class Command(BaseCommand):
    help = globals()['__doc__']

    def handle(self, *args, **options):
        for view, pattern in get_api_views():
            print(tpl(view, pattern))
