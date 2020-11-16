import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GithubCodeComponent} from './github-code.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HighlightPlusModule} from 'ngx-highlightjs/plus';



@NgModule({
  declarations: [GithubCodeComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    HighlightPlusModule,
  ],
  exports: [
    GithubCodeComponent,
  ],
})
export class GithubCodeModule { }
