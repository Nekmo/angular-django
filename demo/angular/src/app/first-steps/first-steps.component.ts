import { Component, OnInit } from '@angular/core';
import {GithubFile} from '../github-code/github-code.component';

@Component({
  selector: 'app-first-steps',
  templateUrl: './first-steps.component.html',
  styleUrls: ['./first-steps.component.scss']
})
export class FirstStepsComponent implements OnInit {

  tutorialFiles: GithubFile[] = [
    {name: 'models.py', directory: 'pokedex'},
    {name: 'serializers.py', directory: 'pokedex'},
    {name: 'viewsets.py', directory: 'pokedex'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
