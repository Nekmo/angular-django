import { Component, OnInit } from '@angular/core';
import {GithubFile} from '../github-code/github-code.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'django-select',
  templateUrl: './form-api-service.component.html',
  styleUrls: ['./form-api-service.component.scss']
})
export class FormApiServiceComponent implements OnInit {

  formPokemonFiles: GithubFile[] = [
    {name: 'form-pokemon.component.html', directory: 'form-api-service/form-pokemon'},
    {name: 'form-pokemon.component.ts', directory: 'form-api-service/form-pokemon'},
    {name: 'form-api-service.module.ts', directory: 'form-api-service'},
    {name: 'api.service.ts', directory: 'shared'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
