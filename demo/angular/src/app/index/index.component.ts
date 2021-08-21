import { Component, OnInit } from '@angular/core';

const CODE_EXAMPLE_1 = '' +
  'const users: Page<User> = await UserApi.filter({is_active: true}).list();\n' +
  'const user: User = users.first();\n' +
  'await user.setPassword(\'newPassword\'):';

const CODE_EXAMPLE_2 = '' +
  'const specie: Specie = await SpecieApi.retrieve(1);\n' +
  '// Nested objects are instantiated using their serializers.\n' +
  'specie.habitat.getName();';

const CODE_EXAMPLE_3_1 = '' +
  '# models.py\n' +
  '# ---------\n' +
  'class Pokemon(models.Model):\n' +
  '    identifier = models.CharField(max_length=50)\n' +
  '    specie = models.ForeignKey(Specie, on_delete=models.CASCADE)\n' +
  '    height = models.PositiveSmallIntegerField()\n' +
  '    weight = models.PositiveSmallIntegerField()\n' +
  '    base_experience = models.PositiveSmallIntegerField()\n' +
  '    order = models.PositiveSmallIntegerField()\n' +
  '    is_default = models.BooleanField()\n' +
  '    added_at = models.DateTimeField()\n' +
  '\n' +
  '# viewsets.py\n' +
  '# -----------\n' +
  'class PokemonViewSet(viewsets.ModelViewSet):\n' +
  '    queryset = Pokemon.objects.all()\n' +
  '    serializer_class = PokemonSerializer\n' +
  '\n' +
  '# serializers.py\n' +
  '# --------------\n' +
  'class PokemonSerializer(serializers.HyperlinkedModelSerializer):\n' +
  '    specie = SpecieSerializer()\n' +
  '\n' +
  '    class Meta:\n' +
  '        model = Pokemon\n' +
  '        exclude = ()';

const CODE_EXAMPLE_3_2 = '' +
  '// Pokemon API\n' +
  'export class Pokemon extends SerializerService {\n' +
  '  @Field() url: string;\n' +
  '  @Field() specie: Specie;\n' +
  '  @Field() identifier: string;\n' +
  '  @Field() height: number;\n' +
  '  @Field() weight: number;\n' +
  '  @Field() base_experience: number;\n' +
  '  @Field() order: number;\n' +
  '  @Field() is_default: boolean;\n' +
  '  @Field() id: number;\n' +
  '}\n' +
  '\n' +
  '@Api(Pokemon)\n' +
  '@Injectable({\n' +
  '  providedIn: \'root\'\n' +
  '})\n' +
  'export class PokemonApi extends ApiService {\n' +
  '\n' +
  '  url = \'/api/pokemon/\';\n' +
  '  serializer = Pokemon;\n' +
  '\n' +
  '  constructor(injector: Injector) {\n' +
  '    super(injector);\n' +
  '  }\n' +
  '}\n';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  CODE_EXAMPLE_1 = CODE_EXAMPLE_1;
  CODE_EXAMPLE_2 = CODE_EXAMPLE_2;
  CODE_EXAMPLE_3_1 = CODE_EXAMPLE_3_1;
  CODE_EXAMPLE_3_2 = CODE_EXAMPLE_3_2;

  constructor() { }

  ngOnInit(): void {
  }



}
