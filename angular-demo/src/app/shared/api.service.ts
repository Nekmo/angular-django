import {Injectable, Injector} from '@angular/core';
import {Api, ApiService, SerializerService} from 'angular-django';
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
// Specie API
///////////////////////////////////////
export class Specie extends SerializerService {
    // @Field() url: string;
    // @Field() growth_rate: GrowthRate;
    // @Field() shape: Shape;
    // @Field() habitat: Habitat;
    // @Field() generation: Generation;
    // @Field() identifier: string;
    // @Field() color: string;
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


