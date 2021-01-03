from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class AngularDjangoPageNumberPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('page_size', self.page.paginator.per_page),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))

    def get_paginated_response_schema(self, schema):
        response_schema = super().get_paginated_response_schema(schema)
        response_schema['properties']['page_size'] = {
            'type': 'integer',
            'example': 10,
        }
        return response_schema


class StandardResultsSetPagination(AngularDjangoPageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
