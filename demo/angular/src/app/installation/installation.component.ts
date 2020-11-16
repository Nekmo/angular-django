import { Component, OnInit } from '@angular/core';
import {GithubFile} from '../github-code/github-code.component';

@Component({
  selector: 'app-tutorial',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {

  constructor() { }


  tutorialFiles: GithubFile[] = [
    {name: 'retrieve-api-service.component.html', directory: 'retrieve-api-service'},
    {name: 'retrieve-api-service.component.ts', directory: 'retrieve-api-service'},
  ];

  ngOnInit(): void {
  }

}
