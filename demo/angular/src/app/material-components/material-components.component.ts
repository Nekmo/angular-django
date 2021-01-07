import { Component, OnInit } from '@angular/core';
import {SpecieApi} from '../shared/api.service';

@Component({
  selector: 'app-material-components',
  templateUrl: './material-components.component.html',
  styleUrls: ['./material-components.component.scss']
})
export class MaterialComponentsComponent implements OnInit {

  constructor(public specieApi: SpecieApi) { }

  columns = ['id'];

  ngOnInit(): void {
  }

}
