import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  Input, OnChanges, OnDestroy,
  OnInit, Output,
  QueryList, SimpleChanges, ViewChild
} from '@angular/core';
import {ApiService, Page, Dictionary} from 'angular-django';
import {Observable, of as observableOf, merge, Subject, Subscription} from 'rxjs';
import {AngularDjangoMaterialColumnDefDirective} from './angular-django-material-table.directive';
import {Column} from './angular-django-material-table.interface';
import {catchError, debounceTime, map, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EventEmitter} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {SelectionChange} from '@angular/cdk/collections/selection-model';


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
export class AngularDjangoMaterialTableComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit,
  OnDestroy {

  data: Page<any>;
  columnDefsByName: Dictionary<AngularDjangoMaterialColumnDefDirective>;
  displayedColumns: Column[];
  displayedColumnsNames: string[];
  orderingByDefault = true;
  isLoadingResults = true;
  isRateLimitReached = false;
  debounceTimeUpdateResults = 150;
  debouncedUpdateResults = new Subject();
  selectionChanged: Subscription;
  destroy$ = new EventEmitter();

  @Input() api: ApiService;
  @Input() columns: (string|Column)[];
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Input() search = '';
  @Input() filters: Dictionary<string | number>;
  @Input() resultsCount = 0;
  @Input() selection: SelectionModel<any>;
  @ContentChildren(AngularDjangoMaterialColumnDefDirective, {descendants: true}) columnDefs!:
    QueryList<AngularDjangoMaterialColumnDefDirective>;
  @Input() paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() loadedResults = new EventEmitter<Page<any>>();
  @Output() updateResults = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() resultsCountChange = new EventEmitter<number>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() isAllSelectedChanged = new EventEmitter<boolean>();

  constructor(private cdr: ChangeDetectorRef) {
    this.debouncedUpdateResults.pipe(
      debounceTime(this.debounceTimeUpdateResults),
      takeUntil(this.destroy$),
    ).subscribe(() => {
        this.updateResults.emit();
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.updateColumns();
    }
    if (changes['search'] && changes['search'].previousValue !== this.search) {
      this.searchChanged.emit(this.search);
      this.debouncedUpdateResults.next();
    }
    if (changes['filters']) {
      this.updateResults.emit();
    }
    if (changes['selection']) {
      if (this.selectionChanged) {
        this.selectionChanged.unsubscribe();
      }
      this.selectionChanged = this.selection.changed.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.cdr.detectChanges();
      });
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
    // Paginator index subscriber
    if (this.paginator) {
      this.paginator.page.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.pageSizeChange.emit(this.paginator.pageSize);
      });
    }

    // Reset pageIndex subscriber
    merge(this.sort.sortChange, this.searchChanged).pipe(takeUntil(this.destroy$))
      .subscribe(() => this.paginator.pageIndex = 0);

    // Load results subscriber
    const events: EventEmitter<any>[] = [this.sort.sortChange, this.updateResults];
    if (this.paginator) {
      events.push(this.paginator.page);
    }
    merge.apply(merge, events)
      .pipe(
        startWith({}),
        takeUntil(this.destroy$),
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
          query = query.filter(this.filters || {});
          return query.list().pipe(catchError((err) => {
            console.error(err);
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
      this.displayedColumnsNames = [];
      if (this.selection) {
        this.displayedColumnsNames.push('select');
      }
      this.displayedColumnsNames.push(...this.displayedColumns.map((x) => x.name));
    });
  }

  resetPageIndex(): void {
    if (this.paginator) {
      this.paginator.pageSize = 0;
    }
  }

  isAllSelected(): boolean {
    if (!this.data) {
      return false;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    const isAllSelected = numSelected === numRows;
    this.isAllSelectedChanged.emit(isAllSelected);
    return isAllSelected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if ( !this.data ) {
      return;
    }
    this.isAllSelected() ?
        this.selection.clear() :
        this.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
