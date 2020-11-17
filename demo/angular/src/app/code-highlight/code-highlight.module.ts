import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlightComponent } from './code-highlight.component';
import {HighlightPlusModule} from 'ngx-highlightjs/plus';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [CodeHighlightComponent],
  imports: [
    CommonModule,
    HighlightPlusModule,
    MatCardModule,
  ],
  exports: [
    CodeHighlightComponent,
  ]
})
export class CodeHighlightModule { }
