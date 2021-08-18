import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalHtmlComponent } from './external-html.component';


@NgModule({
  declarations: [ExternalHtmlComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ExternalHtmlComponent,
  ]
})
export class ExternalHtmlModule { }
