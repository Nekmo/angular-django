import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path        : 'tutorial',
        loadChildren : () => import('./tutorial/tutorial.module').then(m => m.TutorialModule),
    },
    {
        path        : 'retrieve-api-service',
        loadChildren : () => import('./retrieve-api-service/retrieve-api-service.module').then(m => m.RetrieveApiServiceModule),
    },
    {
        path        : 'list-api-service',
        loadChildren : () => import('./list-api-service/list-api-service.module').then(m => m.ListApiServiceModule),
    },
    {
        path        : 'form-api-service',
        loadChildren : () => import('./form-api-service/form-api-service.module').then(m => m.FormApiServiceModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
