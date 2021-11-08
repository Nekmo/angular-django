import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path        : '',
        loadChildren : () => import('./index/index.module').then(m => m.IndexModule),
    },
    {
        path        : 'installation',
        loadChildren : () => import('./installation/installation.module').then(m => m.InstallationModule),
    },
    {
        path        : 'first-steps',
        loadChildren : () => import('./first-steps/first-steps.module').then(m => m.FirstStepsModule),
    },
    {
        path        : 'api-guide',
        loadChildren : () => import('./api-guide/api-guide.module').then(m => m.ApiGuideModule),
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
    {
        path        : 'material-components',
        loadChildren : () => import('./material-components/material-components.module').then(m => m.MaterialComponentsModule),
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
