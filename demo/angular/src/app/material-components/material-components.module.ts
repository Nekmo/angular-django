import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './table/table.module';
import {AngularDjangoMaterialModule} from 'angular-django/material';
import {RouterModule, Routes} from '@angular/router';
import { MaterialComponentsComponent } from './material-components.component';
import {AngularDjangoModule} from 'angular-django';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';


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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    AngularDjangoMaterialModule,
    RouterModule.forChild(routes),
    AngularDjangoModule,
  ]
})
export class MaterialComponentsModule { }
