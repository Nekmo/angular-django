import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Specie, SpecieApi} from '../shared/api.service';
import {SelectionModel} from '@angular/cdk/collections';
import {EventEmitter} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {ApiService, DjangoFormlyFilterField, Options} from 'angular-django';
import {FormGroup} from '@angular/forms';
import {AngularDjangoMaterialTableComponent} from 'angular-django/material';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';


export interface MaterialComponentsDialogData {
  filters: {};
  api: ApiService;
}


@Component({
  template: `
    <h2 mat-dialog-title>Apply filters</h2>
    <mat-dialog-content class="mat-typography">
      <form [formGroup]="filterForm" (ngSubmit)="close();">
        <formly-form [form]="filterForm" [fields]="filterFields" [model]="filters">
<!--          <button mat-raised-button color="primary">Filter</button>-->
        </formly-form>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial (click)="close();">Filter</button>
    </mat-dialog-actions>
  `,
})
export class MaterialComponentsDialogComponent {

  filterFields: DjangoFormlyFilterField[];
  filters = {};
  filterForm = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<MaterialComponentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialComponentsDialogData) {

    Object.assign(this.filters, this.data.filters);
    this.data.api.options().pipe(take(1)).subscribe(() => {
      this.filterFields = this.data.api.getFilterFormFields();
      console.log(this.filterFields);
    });
  }

  close(): void {
    this.dialogRef.close(this.filters);
  }
}


@Component({
  selector: 'app-material-components',
  templateUrl: './material-components.component.html',
  styleUrls: ['./material-components.component.scss']
})
export class MaterialComponentsComponent implements OnInit, OnDestroy {

  search: string;
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
  filtersCount: string|number = '';

  @ViewChild('table') table: AngularDjangoMaterialTableComponent;

  constructor(public specieApi: SpecieApi, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.columnNames = this.specieApi.serializer.fieldNames.filter(name => this.excludedFieldNames.indexOf(name) === -1);
    this.selection.changed.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // Reset allPagesSelected after uncheck an element,
      if (this.allPagesSelected && this.pageSize > this.selection.selected.length) {
        this.allPagesSelected = false;
      }
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

  openFiltersDialog(): void {
    const dialogRef = this.dialog.open(MaterialComponentsDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      data: {api: this.specieApi, filters: this.filters}
    });

    // TODO: cancel is not working
    dialogRef.afterClosed().subscribe(result => {
      Object.assign(this.filters, result);
      this.updateResults();

      this.filtersCount = Object.entries(this.filters).filter((x) => x[1]).length || "";
    });
  }
}
