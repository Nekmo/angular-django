from rest_framework.metadata import SimpleMetadata


class AngularDjangoMetadata(SimpleMetadata):
    def determine_metadata(self, request, view):
        metadata = super().determine_metadata(request, view)
        filters = []
        for filter_backend in view.filter_backends:
            backend = filter_backend()
            if hasattr(backend, 'get_schema_operation_parameters'):
                filters.extend(backend.get_schema_operation_parameters(view))
        metadata['filters'] = filters
        return metadata
