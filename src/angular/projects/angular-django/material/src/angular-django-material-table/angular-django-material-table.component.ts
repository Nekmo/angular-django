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
import {Observable, of as observableOf, merge, Subject} from 'rxjs';
import {AngularDjangoMaterialColumnDefDirective} from './angular-django-material-table.directive';
import {Column} from './angular-django-material-table.interface';
import {catchError, debounceTime, map, startWith, switchMap} from 'rxjs/operators';
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

  data: Page<any>;
  columnDefsByName: Dictionary<AngularDjangoMaterialColumnDefDirective>;
  displayedColumns: Column[];
  displayedColumnsNames: string[];
  orderingByDefault = true;
  isLoadingResults = true;
  isRateLimitReached = false;
  debounceTimeUpdateResults = 150;
  debouncedUpdateResults = new Subject();

  @Input() api: ApiService;
  @Input() columns: (string|Column)[];
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() search: string;
  @Input() resultsCount = 0;
  @ContentChildren(AngularDjangoMaterialColumnDefDirective, {descendants: true}) columnDefs!:
    QueryList<AngularDjangoMaterialColumnDefDirective>;
  @Input() paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() loadedResults = new EventEmitter<Page<any>>();
  @Output() updateResults = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() resultsCountChange = new EventEmitter<number>();


  constructor(private cdr: ChangeDetectorRef) {
    this.debouncedUpdateResults.pipe(debounceTime(this.debounceTimeUpdateResults)).subscribe(() => {
        this.updateResults.emit();
      });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.updateColumns();
    }
    if (changes['search']) {
      this.debouncedUpdateResults.next();
    }
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

    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.pageSizeChange.emit(this.paginator.pageSize);
      });
    }

    const events: EventEmitter<any>[] = [this.sort.sortChange, this.updateResults];

    if (this.paginator) {
      events.push(this.paginator.page);
    }

    merge.apply(merge, events)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const pageSize: number|null = (this.paginator && this.paginator.pageSize) || this.pageSize;
          const page = ((this.paginator && this.paginator.pageIndex) || 0) + 1;
          let query = this.api.page(page, pageSize);
          if (this.sort.active) {
            query = query.orderBy((this.sort.direction === 'asc' ? '' : '-') + this.sort.active);
          }
          if (this.search) {
            query = query.search(this.search);
          }
          return query.list().pipe(catchError(() => {
            return observableOf(new Page(this.api, []));
          }));
        }),
        map((data: Page<any>) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsCount = data.count;
          this.resultsCountChange.emit(this.resultsCount);

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf(new Page(this.api, []));
        })
      ).subscribe((data: Page<any>) => {
        this.data = data;
        this.loadedResults.emit(data);
        if (!this.pageSize) {
          this.pageSize = data.pagesSize;
          this.pageSizeChange.emit(data.pagesSize);
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
