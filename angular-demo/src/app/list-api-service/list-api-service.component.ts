import { Component, OnInit } from '@angular/core';
import {SpecieApi} from '../shared/api.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-api-service',
  templateUrl: './list-api-service.component.html',
  styleUrls: ['./list-api-service.component.scss']
})
export class ListApiServiceComponent implements OnInit {

  species: any;
  page = 1;
  search = '';
  count: number;
  pagesCount: number;

  constructor(public specieApi: SpecieApi) {
  }

  get pagesArray(): number[] {
    return Array.from(Array(this.pagesCount).keys()).map((i) => i + 1);
  }

  setSpecies(resetPage: boolean = false): void {
    if (resetPage) {
      this.page = 1;
    }
    this.species = this.specieApi.page(this.page).search(this.search).list().pipe(map((items: any) => {
      console.log(items);
      this.count = items.count;
      this.pagesCount = items.pagesCount;
      return items;
    }));
  }

  ngOnInit(): void {
    this.setSpecies();
  }

}
