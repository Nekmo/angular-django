import django_filters

from pokedex.models import Pokemon


class PokemonFilter(django_filters.FilterSet):
    specie__identifier = django_filters.CharFilter(lookup_expr='icontains')


    class Meta:
        model = Pokemon
        fields = ('id', 'identifier', 'specie__identifier', 'specie__generation',
                  'specie', 'height', 'weight', 'base_experience', 'is_default')
        # fields = {
        #     'client': ['icontains',],
        # }
