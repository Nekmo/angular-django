import { Component, OnInit } from '@angular/core';
import {User, UserApi} from '../shared/api.service';
import {Observable} from 'rxjs';
import {GithubFile} from '../github-code/github-code.component';


@Component({
  selector: 'app-retrieve-api-service',
  templateUrl: './retrieve-api-service.component.html',
  styleUrls: ['./retrieve-api-service.component.scss']
})
export class RetrieveApiServiceComponent implements OnInit {

  retrieveUserFiles: GithubFile[] = [
    {name: 'retrieve-user.component.html', directory: 'retrieve-api-service/retrieve-user'},
    {name: 'retrieve-user.component.ts', directory: 'retrieve-api-service/retrieve-user'},
    {name: 'api.service.ts', directory: 'shared'},
  ];

  retrievePokemonFiles: GithubFile[] = [
    {name: 'retrieve-pokemon.component.html', directory: 'retrieve-api-service/retrieve-pokemon'},
    {name: 'retrieve-pokemon.component.ts', directory: 'retrieve-api-service/retrieve-pokemon'},
    {name: 'api.service.ts', directory: 'shared'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

