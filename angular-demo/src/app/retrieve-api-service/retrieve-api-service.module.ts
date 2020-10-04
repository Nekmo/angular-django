import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrieveApiServiceComponent } from './retrieve-api-service.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AngularDjangoModule} from 'angular-django';


const routes: Routes = [
  {
      path     : '',
      component: RetrieveApiServiceComponent,
  },
];


@NgModule({
  declarations: [RetrieveApiServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularDjangoModule,
    RouterModule.forChild(routes),
  ]
})
export class RetrieveApiServiceModule { }
