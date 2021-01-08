import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './table/table.module';
import {AngularDjangoMaterialModule} from 'angular-django/material';
import {RouterModule, Routes} from '@angular/router';
import { MaterialComponentsComponent } from './material-components.component';
import {AngularDjangoModule} from 'angular-django';


const routes: Routes = [
  {
      path     : '',
      component: MaterialComponentsComponent,
  },
];


@NgModule({
  declarations: [MaterialComponentsComponent],
  imports: [
    CommonModule,
    TableModule,
    AngularDjangoMaterialModule,
    RouterModule.forChild(routes),
    AngularDjangoModule,
  ]
})
export class MaterialComponentsModule { }
