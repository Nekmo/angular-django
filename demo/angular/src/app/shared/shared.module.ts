import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HabitatApi, RegionApi, SpecieApi, UserApi} from './api.service';
import {GithubCodeModule} from '../github-code/github-code.module';
import {CodeHighlightModule} from '../code-highlight/code-highlight.module';



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
    CodeHighlightModule,
  ],
  exports: [
    HttpClientModule,
    GithubCodeModule,
    CodeHighlightModule,
  ]
})
export class SharedModule { }
