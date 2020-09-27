import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RegionApi, SpecieApi} from './api.service';



@NgModule({
  declarations: [],
  providers: [
    RegionApi,
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
