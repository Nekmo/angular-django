First steps
===========
Angular-django generates the classes for angular from your Django Rest Framework viewsets and serializers.
2 types of classes are generated:

* The ``ApiService`` classes are created from the **viewsets**. It has the api actions. For example *list, retrieve,
  etc.*
* The ``SerializerService`` classes are created from the **serializers**. It has the properties of the objects
  returned by the api.

For example from this model, viewset and serializer:

.. code-block:: python

    # models.py
    # ---------

    class Pokemon(models.Model):
        identifier = models.CharField(max_length=50, help_text=_("Pokemon name"))
        specie = models.ForeignKey(Specie, on_delete=models.CASCADE)
        height = models.PositiveSmallIntegerField()
        weight = models.PositiveSmallIntegerField()
        base_experience = models.PositiveSmallIntegerField()
        order = models.PositiveSmallIntegerField()
        is_default = models.BooleanField()
        added_at = models.DateTimeField()

    # viewsets.py
    # -----------

    class PokemonViewSet(viewsets.ModelViewSet):
        queryset = Pokemon.objects.all()
        serializer_class = PokemonSerializer

    # serializers.py
    # --------------

    class PokemonSerializer(serializers.HyperlinkedModelSerializer):
        specie = SpecieSerializer()

        class Meta:
            model = Pokemon
            exclude = ()

Using the ``manage.py angular_classes`` command these classes are generated:

.. code-block:: typescript

    ///////////////////////////////////////
    // Pokemon API
    ///////////////////////////////////////
    export class Pokemon extends SerializerService {
         @Field() url: string;
         @Field() specie: Specie;
         @Field() identifier: string;
         @Field() height: number;
         @Field() weight: number;
         @Field() base_experience: number;
         @Field() order: number;
         @Field() is_default: boolean;
         @Field() added_at: Date;
         @Field() id: number;
    }

    @Injectable({
      providedIn: 'root'
    })
    export class PokemonApi extends ApiService {

        url = '/api/pokemon/';
        serializer = Pokemon;
        contentType = 'pokedex_pokemon';

        constructor(injector: Injector) {
            super(injector);
        }
    }

Whenever you want to rebuild the classes for Angular run again from the console:

.. code-block:: shell

    $ python setup.py angular_classes

Paste the terminal output to a file in your Angular project. For example ``api.service.ts``. Angular-django doesn't
update your existing classes. Edit your classes with the new changes from the terminal output.

Now you can use the ``PokemonApi`` class to get interact with your Django Rest Framework api:


.. code-block:: typescript

    PokemonApi.retrieve(123).subscribe(obj: Pokemon => {  // Get pokemon with id 123
          obj.added_at.toLocaleString();  // added_at is returned as Date
          obj.specie.methodInCls();  // specie is returned as Specie and its methods are available
    });

