import { Component, OnInit } from '@angular/core';
import {SpecieApi} from '../shared/api.service';

@Component({
  selector: 'app-material-components',
  templateUrl: './material-components.component.html',
  styleUrls: ['./material-components.component.scss']
})
export class MaterialComponentsComponent implements OnInit {

  excludedFieldNames: string[] = [
    'url', 'gender_rate', 'hatch_counter', 'order', 'has_gender_differences', 'forms_switchable', 'conquest_order',
    'evolves_from_specie', 'base_happiness',
  ];
  columnNames: string[];
  pageSizeOptions: number[] = [10, 20, 50];

  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    this.columnNames = this.specieApi.serializer.fieldNames.filter(name => this.excludedFieldNames.indexOf(name) === -1);
  }

}
