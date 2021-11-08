import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {catchFormError} from 'angular-django';
import {SpecieApi} from '../../shared/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    this.fields = this.specieApi.getFormFields([
      'identifier', 'habitat', ['color', 'is_baby']
    ]);
  }

  submit(model): void {
    this.specieApi.create(model)
      .pipe(catchFormError(this.form)).subscribe();
  }


}
