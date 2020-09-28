import { Component, OnInit } from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {SpecieApi} from '../shared/api.service';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {catchFormError} from '../../../../angular-django/projects/angular-django/src/lib/form';

@Component({
  selector: 'app-form-api-service',
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
    this.fields = this.specieApi.getFormFields(['identifier', ['height', 'weight']]);
    console.log(this.fields);
  }

  submit(model): void {
    this.specieApi.create(model)
      .pipe(catchFormError(this.form)).subscribe();
  }

}
