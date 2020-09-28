import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormApiServiceComponent } from './form-api-service.component';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
      path     : '',
      component: FormApiServiceComponent,
  },
];


@NgModule({
  declarations: [FormApiServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,

    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,

    RouterModule.forChild(routes),
  ]
})
export class FormApiServiceModule { }
