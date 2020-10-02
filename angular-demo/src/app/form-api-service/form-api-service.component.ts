import { Component, OnInit } from '@angular/core';
import {FieldType, FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {Specie, SpecieApi} from '../shared/api.service';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {catchFormError} from 'angular-django';


@Component({
  // tslint:disable-next-line:component-selector
 selector: 'django-select',
 template: `
   <mat-form-field class="example-form-field">
     <input matInput type="text" [formControl]="formControl" [formlyAttributes]="field">
   </mat-form-field>

 `,
})
export class DjangoSelectComponent extends FieldType {}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'django-select',
  templateUrl: './form-api-service.component.html',
  styleUrls: ['./form-api-service.component.scss']
})
export class FormApiServiceComponent implements OnInit {

  form = new FormGroup({});
  model = { identifier: 'foo' };
  fields: FormlyFieldConfig[];
  // fields: FormlyFieldConfig[] = [{
  //   key: 'identifier',
  //   type: 'input',
  //   templateOptions: {
  //     type: 'text',
  //     label: 'Identifier',
  //     placeholder: 'Enter identifier',
  //     required: false,
  //   }
  // }];


  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    // this.specieApi.options().subscribe(() => {
    //   this.fields = this.specieApi.getFormFields(['identifier', ['color', 'gender_rate']]);
    // });

    this.fields = this.specieApi.getFormFields(['identifier', ['color', 'gender_rate']]);
  }

  submit(model): void {
    this.specieApi.create(model)
      .pipe(catchFormError(this.form)).subscribe();
  }

}
