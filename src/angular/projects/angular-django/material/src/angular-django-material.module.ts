import { NgModule } from '@angular/core';
import {AngularDjangoMaterialTableComponent} from './angular-django-material-table/angular-django-material-table.component';
// import {AngularDjangoModule} from '../../src/lib/angular-django.module';
// Uncomment the following line for development
// import { AngularDjangoModule } from '../../src/public-api';


@NgModule({
  imports: [
    // AngularDjangoModule,
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
