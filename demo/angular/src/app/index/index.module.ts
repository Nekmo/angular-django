import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import { FormComponent } from './form/form.component';
import {ListComponent, MaterialComponentsDialogComponent} from './list/list.component';
import {AngularDjangoMaterialModule} from 'angular-django/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AngularDjangoModule} from 'angular-django';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  {
      path     : '',
      component: IndexComponent,
  },
];


@NgModule({
  declarations: [
    IndexComponent,
    FormComponent,
    ListComponent,
    MaterialComponentsDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,

    MatTableModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,


    RouterModule.forChild(routes),
    AngularDjangoModule,
    AngularDjangoMaterialModule,

  ]
})
export class IndexModule { }
