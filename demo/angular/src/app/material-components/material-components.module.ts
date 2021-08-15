import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './table/table.module';
import {AngularDjangoMaterialModule} from 'angular-django/material';
import {RouterModule, Routes} from '@angular/router';
import {MaterialComponentsComponent, MaterialComponentsDialogComponent} from './material-components.component';
import {AngularDjangoModule} from 'angular-django';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormlyModule} from '@ngx-formly/core';
import {MatButtonModule} from '@angular/material/button';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {AutocompleteTypeComponent} from '../shared/autocomplete-type.component';


const routes: Routes = [
  {
      path     : '',
      component: MaterialComponentsComponent,
  },
];


@NgModule({
  declarations: [
    MaterialComponentsComponent,
    MaterialComponentsDialogComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {name: 'autocomplete', component: AutocompleteTypeComponent, wrappers: ['form-field']},
      ],
    }),
    FormlyMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularDjangoMaterialModule,
    RouterModule.forChild(routes),
    AngularDjangoModule,
  ]
})
export class MaterialComponentsModule { }
