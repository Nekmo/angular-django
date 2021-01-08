import { NgModule } from '@angular/core';
import {
  AngularDjangoMaterialTableComponent,
} from './angular-django-material-table.component';
import {
  AngularDjangoMaterialColumnDefDirective,
  DjangoCellDefDirective,
} from './angular-django-material-table.directive';
import {AngularDjangoModule} from 'angular-django';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    AngularDjangoModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  declarations: [
    AngularDjangoMaterialTableComponent,
    DjangoCellDefDirective,
    AngularDjangoMaterialColumnDefDirective,
  ],
  exports: [
    AngularDjangoMaterialTableComponent,
    DjangoCellDefDirective,
    AngularDjangoMaterialColumnDefDirective,
  ]
})
export class AngularDjangoMaterialTableModule {
}
