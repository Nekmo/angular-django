import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallationComponent } from './installation.component';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';


const routes: Routes = [
  {
      path     : '',
      component: InstallationComponent,
  },
];


@NgModule({
  declarations: [InstallationComponent],
  imports: [
    CommonModule,
    // HighlightModule,
    HighlightPlusModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class InstallationModule { }
