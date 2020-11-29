import { NgModule } from '@angular/core';
import { AngularDjangoComponent } from './angular-django.component';
import {GetDisplayPipe} from './get-display.pipe';



@NgModule({
  declarations: [AngularDjangoComponent, GetDisplayPipe],
  imports: [
  ],
  exports: [AngularDjangoComponent, GetDisplayPipe]
})
export class AngularDjangoModule { }
