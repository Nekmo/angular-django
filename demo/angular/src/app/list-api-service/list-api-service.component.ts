import { Component, OnInit } from '@angular/core';
import {GithubFile} from '../github-code/github-code.component';

@Component({
  selector: 'app-list-api-service',
  templateUrl: './list-api-service.component.html',
  styleUrls: ['./list-api-service.component.scss']
})
export class ListApiServiceComponent implements OnInit {

  listPokemonFiles: GithubFile[] = [
    {name: 'list-pokemon.component.html', directory: 'list-api-service/list-pokemon'},
    {name: 'list-pokemon.component.ts', directory: 'list-api-service/list-pokemon'},
    {name: 'api.service.ts', directory: 'shared'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
