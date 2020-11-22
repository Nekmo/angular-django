import inspect
from itertools import chain

from django.conf import settings
from django.urls import URLResolver, URLPattern
from django.utils.module_loading import import_string
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet


def get_views(resolv, pattern=()):
    if isinstance(resolv, URLResolver):
        for item in resolv.url_patterns:
            for sub in get_views(item, pattern + (resolv.pattern,)):
                yield sub
    elif isinstance(resolv, URLPattern):
        try:
            mod = import_string(resolv.lookup_str)
        except ModuleNotFoundError:
            pass
        else:
            yield mod, pattern + (resolv.pattern,)


def get_api_views():
    patterns = getattr(import_string(settings.ROOT_URLCONF), 'urlpatterns')
    views = set(list(chain(*[get_views(pattern) for pattern in patterns])))
    views = [view for view in views
             if inspect.isclass(view[0]) and issubclass(view[0], GenericViewSet) and \
                '(?P<format>[a-z0-9]+)' not in view[1][-1]._regex and \
                '(?P<pk>[^/.]+)' not in view[1][-1]._regex]
    return views
