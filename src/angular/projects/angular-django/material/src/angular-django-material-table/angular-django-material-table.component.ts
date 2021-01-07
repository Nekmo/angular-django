import {Component, Input, OnInit} from '@angular/core';
import {ApiService, Page} from 'angular-django';
import {Observable} from 'rxjs';

@Component({
  selector: 'adm-table',
  templateUrl: './angular-django-material-table.component.html',
  styleUrls: ['./angular-django-material-table.component.css']
})
export class AngularDjangoMaterialTableComponent implements OnInit {

  constructor() { }

  @Input() api: ApiService;
  @Input() displayedColumns: string[];

  apiList$: Observable<Page<any>>;

  ngOnInit(): void {
    this.apiList$ = this.api.list();

    if (!this.displayedColumns) {
      this.displayedColumns = Object.keys(this.api.serializer.fields);
    }
  }

  onRowClick(row, event): void {
  }

}
