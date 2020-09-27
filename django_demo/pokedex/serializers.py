from django.contrib.auth import get_user_model
from drf_writable_nested import NestedUpdateMixin, NestedCreateMixin
from rest_framework import serializers

from pokedex.models import Pokemon, Specie, Generation, Habitat, Shape, GrowthRate, Region


class DemoSerializerMixin(object):
    def get_field_names(self, declared_fields, info):
        expanded_fields = super(DemoSerializerMixin, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            fields = expanded_fields + self.Meta.extra_fields
        else:
            fields = expanded_fields
        if 'id' not in fields:
            fields += ['id']
        return fields


class RegionSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                       serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Region
        exclude = ()


class GenerationSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                           serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Generation
        exclude = ()


class HabitatSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                        serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Habitat
        exclude = ()


class ShapeSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                      serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shape
        exclude = ()


class GrowthRateSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                           serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GrowthRate
        exclude = ()


class SpecieSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                       serializers.HyperlinkedModelSerializer):
    growth_rate = GrowthRateSerializer()
    shape = ShapeSerializer()
    habitat = HabitatSerializer()
    generation = GenerationSerializer()
    # evolves_from_specie = SpecieSerializer()

    class Meta:
        model = Specie
        exclude = ()


class PokemonSerializer(DemoSerializerMixin, NestedCreateMixin, NestedUpdateMixin,
                        serializers.HyperlinkedModelSerializer):
    specie = SpecieSerializer()

    class Meta:
        model = Pokemon
        exclude = ()


class SimpleUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('url', 'id', 'username')


class UserSerializer(SimpleUserSerializer):
    pass