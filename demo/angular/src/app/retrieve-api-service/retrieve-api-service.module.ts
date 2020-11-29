import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetrieveApiServiceComponent } from './retrieve-api-service.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AngularDjangoModule} from 'angular-django';
import { RetrieveUserComponent } from './retrieve-user/retrieve-user.component';
import {MatCardModule} from '@angular/material/card';
import { RetrievePokemonComponent } from './retrieve-pokemon/retrieve-pokemon.component';


const routes: Routes = [
  {
      path     : '',
      component: RetrieveApiServiceComponent,
  },
];


@NgModule({
  declarations: [RetrieveApiServiceComponent, RetrieveUserComponent, RetrievePokemonComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    AngularDjangoModule,
    RouterModule.forChild(routes),
  ]
})
export class RetrieveApiServiceModule { }
