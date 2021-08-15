import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  GenerationApi,
  GrowthRateApi,
  HabitatApi,
  PokemonApi,
  RegionApi,
  ShapeApi,
  SpecieApi,
  UserApi
} from './api.service';
import {GithubCodeModule} from '../github-code/github-code.module';
import {CodeHighlightModule} from '../code-highlight/code-highlight.module';
import {HttpErrorInterceptor} from './interceptor';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  providers: [
    RegionApi,
    GenerationApi,
    HabitatApi,
    ShapeApi,
    GrowthRateApi,
    SpecieApi,
    PokemonApi,
    UserApi,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [MatSnackBar]
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GithubCodeModule,
    CodeHighlightModule,
    MatSnackBarModule,
  ],
  exports: [
    HttpClientModule,
    GithubCodeModule,
    CodeHighlightModule,
  ]
})
export class SharedModule { }
