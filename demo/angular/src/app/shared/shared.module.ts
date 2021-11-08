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
import {FormlyModule} from '@ngx-formly/core';
import {AutocompleteTypeComponent} from './autocomplete-type.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ExternalHtmlModule} from '../external-html/external-html.module';



@NgModule({
  declarations: [
    AutocompleteTypeComponent
  ],
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
    FormsModule,
    FormlyModule.forChild({
      types: [
        {name: 'autocomplete', component: AutocompleteTypeComponent, wrappers: ['form-field']},
      ],
    }),
    ReactiveFormsModule,
    FormlyModule,
    CommonModule,
    HttpClientModule,
    GithubCodeModule,
    ExternalHtmlModule,
    CodeHighlightModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSnackBarModule,
  ],
  exports: [
    FormlyModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AutocompleteTypeComponent,
    HttpClientModule,
    GithubCodeModule,
    ExternalHtmlModule,
    CodeHighlightModule,
  ]
})
export class SharedModule { }
