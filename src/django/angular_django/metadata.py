from django.forms import fields as django_forms_fields
from rest_framework.metadata import SimpleMetadata
from rest_framework.utils.field_mapping import ClassLookupDict

try:
    from django_filters.rest_framework import DjangoFilterBackend
except ImportError:
    DjangoFilterBackend = None


if DjangoFilterBackend is not None:
    from django_filters import fields as django_filters_fields
    FORM_FIELDS = {
        django_forms_fields.NullBooleanField: 'boolean',
        django_forms_fields.BooleanField: 'boolean',
        django_forms_fields.URLField: 'url',
        django_forms_fields.EmailField: 'email',
        django_forms_fields.RegexField: 'regex',
        django_forms_fields.SlugField: 'slug',
        django_forms_fields.IntegerField: 'integer',
        django_forms_fields.FloatField: 'float',
        django_forms_fields.DecimalField: 'decimal',
        django_forms_fields.DateField: 'date',
        django_forms_fields.DateTimeField: 'datetime',
        django_forms_fields.TimeField: 'time',
        django_forms_fields.ChoiceField: 'choice',
        django_filters_fields.ChoiceField: 'choice',
        django_forms_fields.MultipleChoiceField: 'multiple choice',
        django_filters_fields.MultipleChoiceField: 'multiple choice',
        django_forms_fields.FileField: 'file upload',
        django_forms_fields.FilePathField: 'file upload',
        django_forms_fields.ImageField: 'image upload',
        django_filters_fields.ModelMultipleChoiceField: 'list',
        django_filters_fields.ModelChoiceField: 'nested object',
    }
else:
    FORM_FIELDS = {}


class AngularDjangoMetadata(SimpleMetadata):
    label_form_lookup = ClassLookupDict(FORM_FIELDS)


    def determine_metadata(self, request, view):
        metadata = super().determine_metadata(request, view)
        filters = {}
        for filter_backend in view.filter_backends:
            backend = filter_backend()
            if DjangoFilterBackend is not None and isinstance(backend, DjangoFilterBackend):
                fields = backend.get_filterset_class(view)().form.fields
            else:
                fields = {}
            if hasattr(backend, 'get_schema_operation_parameters'):
                for f in backend.get_schema_operation_parameters(view):
                    f = dict(f)
                    field = fields.get(f['name'])
                    try:
                        f['type'] = self.label_form_lookup[field]
                    except KeyError:
                        pass
                    if field:
                        f['label'] = field.label
                    if field and f.get('type') == 'choice':
                        f['choices'] = [{'value': choice[0], 'display_name': choice[1]} for choice in field.choices]
                    filters[f['name']] = f
        metadata['filters'] = filters
        return metadata
