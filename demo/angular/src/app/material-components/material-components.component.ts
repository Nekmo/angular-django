import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Specie, SpecieApi} from '../shared/api.service';
import {SelectionModel} from '@angular/cdk/collections';
import {EventEmitter} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {DjangoFormlyFilterField, Options} from 'angular-django';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {MatInput} from '@angular/material/input';
import {AngularDjangoMaterialTableComponent} from 'angular-django/material';


@Component({
  selector: 'app-material-components',
  templateUrl: './material-components.component.html',
  styleUrls: ['./material-components.component.scss']
})
export class MaterialComponentsComponent implements OnInit, OnDestroy {

  search: string;
  filterForm = new FormGroup({});
  filterFields: DjangoFormlyFilterField[];
  filters = {};
  excludedFieldNames: string[] = [
    'url', 'gender_rate', 'hatch_counter', 'order', 'has_gender_differences', 'forms_switchable', 'conquest_order',
    'evolves_from_specie', 'base_happiness',
  ];
  columnNames: string[];
  pageSizeOptions: number[] = [10, 20, 50];
  pageSize: number;
  resultsCount = 0;
  selection = new SelectionModel<Specie>(true, []);
  destroy$ = new EventEmitter();

  isAllSelected = false;
  allPagesSelected = false;

  @ViewChild('table') table: AngularDjangoMaterialTableComponent;

  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    this.columnNames = this.specieApi.serializer.fieldNames.filter(name => this.excludedFieldNames.indexOf(name) === -1);
    this.selection.changed.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // Reset allPagesSelected after uncheck an element,
      if (this.allPagesSelected && this.pageSize > this.selection.selected.length) {
        this.allPagesSelected = false;
      }
    });
    this.specieApi.options().pipe(take(1)).subscribe(() => {
      this.filterFields = this.specieApi.getFilterFormFields();
      console.log(this.filterFields);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
    this.destroy$.complete();
  }

  setAllPagesSelected(): void {
    this.allPagesSelected = true;
  }

  clearSelection(): void {
    this.selection.clear();
    this.allPagesSelected = false;
  }

  updateResults(): void {
    if (this.table) {
      this.table.updateResults.emit();
    }
  }
}
