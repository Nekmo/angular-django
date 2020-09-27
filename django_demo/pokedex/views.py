from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination

from pokedex.filters import PokemonFilter
from pokedex.models import Pokemon, Specie, GrowthRate, Generation, Habitat, Shape, Region
from pokedex.serializers import PokemonSerializer, UserSerializer, SpecieSerializer, GrowthRateSerializer, \
    ShapeSerializer, HabitatSerializer, GenerationSerializer, RegionSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class SpecieViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Specie.objects.all()
    serializer_class = SpecieSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    ordering_fields = ('identifier', 'generation', 'evolves_from_specie', 'color', 'shape', 'habitat',
                       'gender_rate', 'capture_rate', 'base_happiness', 'is_baby', 'hatch_counter',
                       'has_gender_differences', 'growth_rate', 'forms_switchable', 'order',
                       'conquest_order')
    search_fields = ('identifier', 'generation__identifier', 'shape__identifier', 'habitat__identifier',
                     'growth_rate__identifier', 'forms_switchable')
    filter_fields = ('identifier', 'generation', 'evolves_from_specie', 'color', 'shape', 'habitat',
                     'gender_rate', 'capture_rate', 'base_happiness', 'is_baby', 'hatch_counter',
                     'has_gender_differences', 'growth_rate', 'forms_switchable',
                     'conquest_order')
    pagination_class = StandardResultsSetPagination


class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    ordering_fields = ('id', 'identifier')
    search_fields = ('identifier',)
    filter_fields = ('id', 'identifier')


class GenerationViewSet(viewsets.ModelViewSet):
    queryset = Generation.objects.all()
    serializer_class = GenerationSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    ordering_fields = ('id', 'identifier')
    search_fields = ('identifier',)
    filter_fields = ('id', 'identifier')


class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    ordering_fields = ('id', 'identifier')
    search_fields = ('identifier',)
    filter_fields = ('id', 'identifier')


class ShapeViewSet(viewsets.ModelViewSet):
    queryset = Shape.objects.all()
    serializer_class = ShapeSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    ordering_fields = ('id', 'identifier')
    search_fields = ('identifier',)
    filter_fields = ('id', 'identifier')


class GrowthRateViewSet(viewsets.ModelViewSet):
    queryset = GrowthRate.objects.all()
    serializer_class = GrowthRateSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    ordering_fields = ('id', 'identifier')
    search_fields = ('identifier',)
    filter_fields = ('id', 'identifier')


class PokemonViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    filter_class = PokemonFilter
    ordering_fields = ('id', 'identifier', 'specie__generation__identifier', 'height',
                       'weight', 'base_experience', 'order', 'is_default')
    search_fields = ('identifier',)
    # filter_fields = ('id', 'identifier', 'specie__identifier',
    #                  'specie', 'height', 'weight', 'base_experience', 'is_default')
    pagination_class = StandardResultsSetPagination



class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
