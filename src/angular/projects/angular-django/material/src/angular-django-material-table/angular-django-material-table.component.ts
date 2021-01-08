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
import {AngularDjangoMaterialColumnDefDirective} from './angular-django-material-table.directive';


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
