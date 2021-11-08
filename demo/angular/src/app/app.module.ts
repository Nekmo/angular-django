import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularDjangoModule} from 'angular-django';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {HighlightPlusModule} from 'ngx-highlightjs/plus';
import {FormlyModule} from '@ngx-formly/core';
import {AutocompleteTypeComponent} from './shared/autocomplete-type.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormlyMaterialModule} from '@ngx-formly/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDjangoModule,
    BrowserAnimationsModule,


    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      types: [
        {name: 'autocomplete', component: AutocompleteTypeComponent, wrappers: ['form-field']},
      ],
    }),

    // HighlightModule,
    HighlightPlusModule,

  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          python: () => import('highlight.js/lib/languages/python'),
          'python-repl': () => import('highlight.js/lib/languages/python-repl'),
          shell: () => import('highlight.js/lib/languages/shell'),
          json: () => import('highlight.js/lib/languages/json'),
          xml: () => import('highlight.js/lib/languages/xml'),
        }

        // fullLibraryLoader: () => import('highlight.js'),
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
