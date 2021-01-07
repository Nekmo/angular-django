import { NgModule } from '@angular/core';
import {AngularDjangoMaterialTableComponent} from './angular-django-material-table.component';
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
  ],
  exports: [
    AngularDjangoMaterialTableComponent,
  ]
})
export class AngularDjangoMaterialTableModule {
}
