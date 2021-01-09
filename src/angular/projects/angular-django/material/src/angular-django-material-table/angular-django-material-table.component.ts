import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  Input, OnChanges,
  OnInit, Output,
  QueryList, SimpleChanges, ViewChild
} from '@angular/core';
import {ApiService, Page, Dictionary} from 'angular-django';
import {Observable, of as observableOf, merge} from 'rxjs';
import {AngularDjangoMaterialColumnDefDirective} from './angular-django-material-table.directive';
import {Column} from './angular-django-material-table.interface';
import {strict} from 'assert';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EventEmitter} from '@angular/core';


const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


@Component({
  selector: 'adm-table',
  templateUrl: './angular-django-material-table.component.html',
  styleUrls: ['./angular-django-material-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularDjangoMaterialTableComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) { }

  @Input() api: ApiService;
  @Input() columns: (string|Column)[];
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @ContentChildren(AngularDjangoMaterialColumnDefDirective, {descendants: true}) columnDefs!:
    QueryList<AngularDjangoMaterialColumnDefDirective>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() loadedResults = new EventEmitter<Page<any>>();

  data: Page<any>;
  columnDefsByName: Dictionary<AngularDjangoMaterialColumnDefDirective>;
  displayedColumns: Column[];
  displayedColumnsNames: string[];
  orderingByDefault = true;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateColumns();
  }

  onRowClick(row, event): void {
  }

  ngAfterContentInit(): void {
    this.columnDefsByName = {};
    this.columnDefs.forEach((columnDef) => {
        this.columnDefsByName[columnDef.name] = columnDef;
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const pageSize: number|null = (this.pageSize && this.paginator.pageSize) || null;
          let query = this.api.page(this.paginator.pageIndex + 1, pageSize);
          if (this.sort.active) {
            query = query.orderBy((this.sort.direction === 'asc' ? '' : '-') + this.sort.active);
          }
          return query.list();
        }),
        map((data: Page<any>) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.count;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data: Page<any>) => {
        this.data = data;
        this.loadedResults.emit(data);
        if (!this.pageSize) {
          this.pageSize = data.pagesSize;
        }
        this.cdr.detectChanges();
      });

  }

  updateColumns(): void {
    this.api.options().subscribe(() => {
      let columns: (string|Column)[] = this.columns;
      if (!columns) {
        columns = this.api.serializer.fieldNames;
      }
      this.displayedColumns = columns.map((x) => {
        if (typeof x === 'string') {
          x = {name: x};
        }
        if (x.ordering === undefined) {
          x.ordering = this.orderingByDefault;
        }
        if (x.label === undefined) {
          x.label = this.api.getOptionField(x.name).label || toTitleCase(x.name.replace('_', ' '));
        }
        return x;
      });
      this.displayedColumnsNames = this.displayedColumns.map((x) => x.name);
    });
  }

}
