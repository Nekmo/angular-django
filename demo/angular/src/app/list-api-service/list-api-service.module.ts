import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListApiServiceComponent } from './list-api-service.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {AngularDjangoModule} from 'angular-django';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import {MatCardModule} from '@angular/material/card';
import { PaginatePokemonComponent } from './paginate-pokemon/paginate-pokemon.component';
import { AllShapeComponent } from './all-shape/all-shape.component';


const routes: Routes = [
  {
      path     : '',
      component: ListApiServiceComponent,
  },
];


@NgModule({
  declarations: [
    ListApiServiceComponent,
    ListPokemonComponent,
    PaginatePokemonComponent,
    AllShapeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule,
    HttpClientModule,
    AngularDjangoModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class ListApiServiceModule { }
