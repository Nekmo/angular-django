import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserApi} from '../../shared/api.service';

@Component({
  selector: 'app-retrieve-user',
  templateUrl: './retrieve-user.component.html',
  styleUrls: ['./retrieve-user.component.scss']
})
export class RetrieveUserComponent implements OnInit {

  user$: Observable<User>;

  constructor(public apiUser: UserApi) { }

  ngOnInit(): void {
    this.user$ = this.apiUser.retrieve(1);
  }

}
