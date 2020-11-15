import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  constructor() { }

  link = 'https://raw.githubusercontent.com/Nekmo/angular-django/master/demo/angular/src/app/retrieve-api-service/retrieve-api-service.component.ts';
  code = 'foo = "bar"';

  ngOnInit(): void {
  }

}
