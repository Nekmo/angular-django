import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DjangoSelectComponent, FormApiServiceComponent} from './form-api-service.component';
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


const routes: Routes = [
  {
      path     : '',
      component: FormApiServiceComponent,
  },
];


@NgModule({
  declarations: [FormApiServiceComponent, DjangoSelectComponent],
  imports: [
    FormlyModule.forRoot({
      types: [
        {name: 'django-select', component: DjangoSelectComponent},
      ],
    }),

    CommonModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
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
