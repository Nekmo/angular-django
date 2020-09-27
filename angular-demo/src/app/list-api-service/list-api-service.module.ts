import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListApiServiceComponent } from './list-api-service.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {AngularDjangoModule} from 'angular-django';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  {
      path     : '',
      component: ListApiServiceComponent,
  },
];


@NgModule({
  declarations: [
    ListApiServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    AngularDjangoModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class ListApiServiceModule { }
