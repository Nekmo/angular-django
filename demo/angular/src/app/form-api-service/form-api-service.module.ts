import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormApiServiceComponent} from './form-api-service.component';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatNativeDateModule} from '@angular/material/core';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import { FormPokemonComponent } from './form-pokemon/form-pokemon.component';
import {MatCardModule} from '@angular/material/card';
import {HighlightPlusModule} from 'ngx-highlightjs/plus';
import {FormlyModule} from '@ngx-formly/core';
import {AutocompleteTypeComponent} from '../shared/autocomplete-type.component';


const routes: Routes = [
  {
      path     : '',
      component: FormApiServiceComponent,
  },
];


@NgModule({
  declarations: [
    FormApiServiceComponent,
    FormPokemonComponent,
  ],
  imports: [
    FormlyModule.forChild({
      types: [
        {name: 'autocomplete', component: AutocompleteTypeComponent, wrappers: ['form-field']},
      ],
    }),
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightPlusModule,
    // FormlyModule.forRoot(),
    FormlyMaterialModule,

    RouterModule.forChild(routes),
    MatInputModule,
    MatCardModule,
  ],
})
export class FormApiServiceModule { }
