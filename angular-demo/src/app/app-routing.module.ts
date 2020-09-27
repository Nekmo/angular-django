import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path        : 'list-api-service',
        loadChildren : () => import('./list-api-service/list-api-service.module').then(m => m.ListApiServiceModule),
    },
    // {
    //     path        : 'pokemon',
    //     loadChildren: './pokemon/pokemon.module#PokemonModule'
    // },
    // {
    //     path        : 'form',
    //     loadChildren: './form-demo/form-demo.module#FormDemoModule'
    // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
