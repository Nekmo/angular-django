import { Component, OnInit } from '@angular/core';
import {SpecieApi} from '../../shared/api.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

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
