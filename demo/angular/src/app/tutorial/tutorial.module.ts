import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
      path     : '',
      component: TutorialComponent,
  },
];


@NgModule({
  declarations: [TutorialComponent],
  imports: [
    CommonModule,
    // HighlightModule,
    HighlightPlusModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class TutorialModule { }
