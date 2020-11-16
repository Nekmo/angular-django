import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HabitatApi, RegionApi, SpecieApi, UserApi} from './api.service';
import {GithubCodeModule} from '../github-code/github-code.module';



@NgModule({
  declarations: [],
  providers: [
    RegionApi,
    HabitatApi,
    SpecieApi,
    UserApi,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GithubCodeModule,
  ],
  exports: [
    HttpClientModule,
    GithubCodeModule,
  ]
})
export class SharedModule { }
