import { Component, OnInit } from '@angular/core';
import {Specie, SpecieApi} from '../shared/api.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-material-components',
  templateUrl: './material-components.component.html',
  styleUrls: ['./material-components.component.scss']
})
export class MaterialComponentsComponent implements OnInit {

  search: string;
  excludedFieldNames: string[] = [
    'url', 'gender_rate', 'hatch_counter', 'order', 'has_gender_differences', 'forms_switchable', 'conquest_order',
    'evolves_from_specie', 'base_happiness',
  ];
  columnNames: string[];
  pageSizeOptions: number[] = [10, 20, 50];
  pageSize: number;
  resultsCount = 0;
  selection = new SelectionModel<Specie>(true, []);

  isAllSelected = false;
  allPagesSelected = false;

  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    this.columnNames = this.specieApi.serializer.fieldNames.filter(name => this.excludedFieldNames.indexOf(name) === -1);
  }

  setAllPagesSelected(): void {
    this.allPagesSelected = true;
  }

  clearSelection(): void {
    // TODO: cdr.detectChanges() in table after change selection. Maybe subscribe to selection change in table?
    this.selection.clear();
    this.allPagesSelected = false;
  }

}
