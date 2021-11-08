import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { AngularDjangoComponent } from './angular-django.component';
import {GetDisplayPipe} from './get-display.pipe';


export interface AngularDjangoConfig {
  rootUrl?: string;
}


export const ANGULAR_DJANGO_CONFIG = new InjectionToken<AngularDjangoConfig[]>('ANGULAR_DJANGO_CONFIG');


@NgModule({
  providers: [
    {provide: ANGULAR_DJANGO_CONFIG, useValue: {} },
  ],
  declarations: [
    AngularDjangoComponent,
    GetDisplayPipe
  ],
  imports: [
  ],
  exports: [
    AngularDjangoComponent,
    GetDisplayPipe
  ]
})
export class AngularDjangoModule {
  static forRoot(config: AngularDjangoConfig): ModuleWithProviders<AngularDjangoModule> {
    return {
      ngModule: AngularDjangoModule,
      providers: [
        {provide: ANGULAR_DJANGO_CONFIG, useValue: config }
      ]
    };
  }
}
