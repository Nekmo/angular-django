import csv

import requests
from django.db.transaction import atomic
from django.db.models import fields
from django.db.models.fields import related

from . import models


URL = 'https://raw.githubusercontent.com/veekun/pokedex/master/pokedex/data/csv/{file}.csv'
FIELD_VALUES = {
    fields.BooleanField: lambda x: {'1': True, '0': False}[x],
    fields.IntegerField: lambda x: int(x) if x else None,
    fields.PositiveSmallIntegerField: lambda x: int(x) if x else None,
    fields.SmallIntegerField: lambda x: int(x) if x else None,
    fields.PositiveIntegerField: lambda x: int(x) if x else None,
    related.ForeignKey: lambda x: int(x) if x else None,
    None: lambda x: x,
}
FIELD_KEYS = {
    related.ForeignKey: lambda x: '{}_id'.format(x.name),
    None: lambda x: x.name,
}


def retrieve_data(file):
    r = requests.get(URL.format(file=file))
    return csv.DictReader(r.text.split('\n'), delimiter=',')


def get_key(field, import_opts):
    fields_map = getattr(import_opts, 'fields_map', {})
    if field.name in fields_map:
        return fields_map[field.name]
    return FIELD_KEYS.get(field.__class__, FIELD_KEYS[None])(field)


def get_value(field):
    return FIELD_VALUES.get(field.__class__, FIELD_VALUES[None])


def get_fields(model, import_opts):
    fields = model._meta.get_fields()
    return {get_key(field, import_opts): (field, get_value(field)) for field in fields}


def import_model(model):
    import_opts = model.Import
    data = retrieve_data(import_opts.file)
    fields = get_fields(model, import_opts)
    for row in data:
        # get_key(model_field[key], import_opts)
        row = {'{}{}'.format(fields[key][0].name,  '_id' if isinstance(fields[key][0], related.ForeignKey) else ''):
                   fields[key][1](value) for key, value in row.items() if key in
               fields}
        # print(row)
        model.objects.get_or_create(defaults=row, id=row['id'])


def import_all():
    with atomic():
        for model in filter(lambda x: hasattr(x, 'Import'), vars(models).values()):
            import_model(model)
