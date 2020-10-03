import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormApiServiceComponent} from './form-api-service.component';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutocompleteTypeComponent} from './autocomplete-type.component';


const routes: Routes = [
  {
      path     : '',
      component: FormApiServiceComponent,
  },
];


@NgModule({
  declarations: [
    FormApiServiceComponent,
    AutocompleteTypeComponent,
  ],
  imports: [
    FormlyModule.forRoot({
      types: [{
        name: 'autocomplete',
        component: AutocompleteTypeComponent,
        wrappers: ['form-field'],
      }],    }),

    CommonModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexLayoutModule,

    FormsModule,
    ReactiveFormsModule,
    // FormlyModule.forRoot(),
    FormlyMaterialModule,

    RouterModule.forChild(routes),
    MatInputModule,
  ],
})
export class FormApiServiceModule { }
