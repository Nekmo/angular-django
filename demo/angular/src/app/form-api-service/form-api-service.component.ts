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
  templateUrl: './form-api-service.component.html',
  styleUrls: ['./form-api-service.component.scss']
})
export class FormApiServiceComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    this.fields = this.specieApi.getFormFields([
      'identifier', 'habitat', ['color', 'gender_rate', 'capture_rate', 'is_baby']
    ]);
  }

  submit(model): void {
    this.specieApi.create(model)
      .pipe(catchFormError(this.form)).subscribe();
  }

}
