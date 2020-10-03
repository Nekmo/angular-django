import {Injectable, Injector} from '@angular/core';
import {Api, ApiService, Field, SerializerService} from 'angular-django';
import 'reflect-metadata';
import {HttpClient} from '@angular/common/http';


///////////////////////////////////////
// Region API
///////////////////////////////////////
export class Region extends SerializerService {
     // @Field() url: string;
     // @Field() identifier: string;
     // @Field() id: number;
}

// @Api(Region)
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class RegionApi extends ApiService {
// export class RegionApi extends ApiService {

  url = '/api/regions/';
  serializer = Region;

  constructor(injector: Injector) {
      super(injector);
  }
}


///////////////////////////////////////
// Habitat API
///////////////////////////////////////
export class Habitat extends SerializerService {
     @Field() url: string;
     @Field() identifier: string;
     @Field() id: number;

    getName() {
        return this.identifier;
    }

}

@Api(Habitat)
@Injectable()
export class HabitatApi extends ApiService {

    url = '/api/habitats/';
    serializer = Habitat;

    constructor(injector: Injector) {
        super(injector);
    }
}


///////////////////////////////////////
// Specie API
///////////////////////////////////////
export class Specie extends SerializerService {
    // @Field() url: string;
    // @Field() growth_rate: GrowthRate;
    // @Field() shape: Shape;
    // @Field({formType: 'autocomplete'}) habitat: Habitat;
    @Field({formType: 'autocomplete'}) habitat: Habitat;
    // @Field() generation: Generation;
    // @Field() identifier: string;
    // @Field({formType: 'select'}) color: string;
    @Field({formType: 'select'}) color: string;
    // @Reflect.metadata("foo2", "bar2") color: string;
    // @Field() gender_rate: number;
    // @Field() capture_rate: number;
    // @Field() base_happiness: number;
    // @Field() is_baby: boolean;
    // @Field() hatch_counter: number;
    // @Field() has_gender_differences: boolean;
    // @Field() forms_switchable: boolean;
    // @Field() order: number;
    // @Field() conquest_order: number;
    // @Field() evolves_from_specie: string;
    // @Field() id: number;

    // getName() {
    //     return this.identifier;
    // }
}


@Api(Specie)
@Injectable()
export class SpecieApi extends ApiService {

    url = '/api/species/';
    serializer = Specie;

    constructor(injector: Injector) {
        super(injector);
    }
}


