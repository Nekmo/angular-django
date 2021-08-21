import {Component, EventEmitter, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Specie, SpecieApi} from '../../shared/api.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {take, takeUntil} from 'rxjs/operators';
import {AngularDjangoMaterialTableComponent} from 'angular-django/material';
import {DjangoFormlyFilterField} from 'angular-django';
import {ApiService} from 'angular-django';
import {FormGroup} from '@angular/forms';


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
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  search: string;
  filterFields: DjangoFormlyFilterField[];
  filters = {};
  columnNames: string[] = ['identifier', 'habitat', 'color'];
  pageSizeOptions: number[] = [3, 10, 20];
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
