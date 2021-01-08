import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren, Directive,
  Input, OnChanges,
  OnInit,
  QueryList, SimpleChanges, TemplateRef
} from '@angular/core';
import {ApiService, Page, Dictionary} from 'angular-django';
import {Observable} from 'rxjs';


@Directive({
    selector: '[admCellDef]',
})
export class DjangoCellDefDirective  {
  constructor(/** @docs-private */ public template: TemplateRef<any>) { }
}


@Directive({
  selector: '[admColumnDef]',
})
export class AngularDjangoMaterialColumnDefDirective {
  /** Unique name for this column. */
  @Input('admColumnDef') name: string;

  /** Whether this column should be sticky positioned at the start of the row */

    /** @docs-private */
  @ContentChild(DjangoCellDefDirective) cell: DjangoCellDefDirective;
}


@Component({
  selector: 'adm-table',
  templateUrl: './angular-django-material-table.component.html',
  styleUrls: ['./angular-django-material-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngularDjangoMaterialTableComponent implements OnInit, OnChanges, AfterContentInit {

  constructor() { }

  @Input() api: ApiService;
  @Input() displayedColumns: string[];
  @ContentChildren(AngularDjangoMaterialColumnDefDirective, {descendants: true}) columnDefs!:
    QueryList<AngularDjangoMaterialColumnDefDirective>;

  apiList$: Observable<Page<any>>;
  columnDefsByName: Dictionary<AngularDjangoMaterialColumnDefDirective>;

  ngOnInit(): void {
    this.apiList$ = this.api.list();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.displayedColumns) {
      this.displayedColumns = this.api.serializer.fieldNames;
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

}
