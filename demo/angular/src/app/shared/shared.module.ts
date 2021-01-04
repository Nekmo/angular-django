import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HabitatApi, RegionApi, SpecieApi, UserApi} from './api.service';
import {GithubCodeModule} from '../github-code/github-code.module';
import {CodeHighlightModule} from '../code-highlight/code-highlight.module';
import {HttpErrorInterceptor} from './interceptor';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  providers: [
    RegionApi,
    HabitatApi,
    SpecieApi,
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
