import django_filters

from pokedex.models import Pokemon, Specie


class PokemonFilter(django_filters.FilterSet):
    specie__identifier = django_filters.CharFilter(lookup_expr='icontains')


    class Meta:
        model = Pokemon
        fields = {
            'id': ['exact'],
            'identifier': ['exact'],
            'specie__identifier': ['exact'],
            'specie__generation': ['exact'],
            'specie': ['exact'],
            'height': ['exact'],
            'weight': ['exact'],
            'base_experience': ['exact'],
            'is_default': ['exact']
        }


class SpecieFilter(django_filters.FilterSet):


    class Meta:
        model = Specie
        fields = {
            'identifier': ['exact'],
            'generation': ['exact'],
            'evolves_from_specie': ['exact'],
            'color': ['exact'],
            'shape': ['exact'],
            'habitat': ['exact'],
            'gender_rate': ['exact'],
            'capture_rate': ['exact'],
            'base_happiness': ['exact'],
            'is_baby': ['exact'],
            'hatch_counter': ['exact'],
            'has_gender_differences': ['exact'],
            'growth_rate': ['exact'],
            'forms_switchable': ['exact'],
            'conquest_order': ['exact']
        }
