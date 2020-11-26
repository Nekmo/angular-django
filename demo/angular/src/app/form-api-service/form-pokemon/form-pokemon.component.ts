import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {SpecieApi} from '../../shared/api.service';
import {catchFormError} from 'angular-django';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.scss']
})
export class FormPokemonComponent implements OnInit {

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
