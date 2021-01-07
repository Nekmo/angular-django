import { NgModule } from '@angular/core';
import {AngularDjangoMaterialTableModule} from './angular-django-material-table/angular-django-material-table.module';


@NgModule({
  imports: [
    AngularDjangoMaterialTableModule,
  ],
  declarations: [
  ],
  exports: [
    AngularDjangoMaterialTableModule,
  ]
})
export class AngularDjangoMaterialModule {
}
