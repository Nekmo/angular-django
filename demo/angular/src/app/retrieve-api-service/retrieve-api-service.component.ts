import { Component, OnInit } from '@angular/core';
import {User, UserApi} from '../shared/api.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-retrieve-api-service',
  templateUrl: './retrieve-api-service.component.html',
  styleUrls: ['./retrieve-api-service.component.scss']
})
export class RetrieveApiServiceComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}

