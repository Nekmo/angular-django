import { NgModule } from '@angular/core';
import {AngularDjangoMaterialTableComponent} from './angular-django-material-table/angular-django-material-table.component';
import {AngularDjangoModule} from 'angular-django';


@NgModule({
  imports: [
    AngularDjangoModule,
  ],
  declarations: [
    AngularDjangoMaterialTableComponent,
  ],
  exports: [
    AngularDjangoMaterialTableComponent,
  ]
})
export class AngularDjangoMaterialModule {
}
