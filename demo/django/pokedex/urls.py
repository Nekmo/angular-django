from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
from pokedex import viewsets


router = DefaultRouter()
router.register(r'pokemon', viewsets.PokemonViewSet)
router.register(r'species', viewsets.SpecieViewSet)
router.register(r'growth_rates', viewsets.GrowthRateViewSet)
router.register(r'shapes', viewsets.ShapeViewSet)
router.register(r'habitats', viewsets.HabitatViewSet)
router.register(r'generations', viewsets.GenerationViewSet)
router.register(r'regions', viewsets.RegionViewSet)
router.register(r'users', viewsets.UserViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^api/', include(router.urls))
]
