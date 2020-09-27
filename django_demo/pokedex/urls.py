from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
from pokedex import views


router = DefaultRouter()
router.register(r'pokemon', views.PokemonViewSet)
router.register(r'species', views.SpecieViewSet)
router.register(r'growth_rates', views.GrowthRateViewSet)
router.register(r'shares', views.ShapeViewSet)
router.register(r'habitats', views.HabitatViewSet)
router.register(r'generations', views.GenerationViewSet)
router.register(r'regions', views.RegionViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^api/', include(router.urls))
]
