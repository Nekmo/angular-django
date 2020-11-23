import { Component, OnInit } from '@angular/core';
import {User, UserApi} from '../shared/api.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-retrieve-api-service',
  templateUrl: './retrieve-api-service.component.html',
  styleUrls: ['./retrieve-api-service.component.scss']
})
export class RetrieveApiServiceComponent implements OnInit {

  user$: Observable<User>;

  constructor(public apiUser: UserApi) { }

  ngOnInit(): void {
    this.user$ = this.apiUser.retrieve(1);
  }

}

