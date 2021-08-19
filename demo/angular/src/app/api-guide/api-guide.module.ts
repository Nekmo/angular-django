import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiGuideComponent } from './api-guide.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
      path     : '',
      component: ApiGuideComponent,
  },
];


@NgModule({
  declarations: [ApiGuideComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ApiGuideModule { }
