import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HabitatApi, RegionApi, SpecieApi} from './api.service';



@NgModule({
  declarations: [],
  providers: [
    RegionApi,
    HabitatApi,
    SpecieApi,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ]
})
export class SharedModule { }
