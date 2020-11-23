import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstStepsComponent } from './first-steps.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
      path     : '',
      component: FirstStepsComponent,
  },
];


@NgModule({
  declarations: [FirstStepsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class FirstStepsModule { }
