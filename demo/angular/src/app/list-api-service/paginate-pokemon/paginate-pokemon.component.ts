import { Component, OnInit } from '@angular/core';
import {Specie, SpecieApi} from '../../shared/api.service';
import {Page} from 'angular-django';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-paginate-pokemon',
  templateUrl: './paginate-pokemon.component.html',
  styleUrls: ['./paginate-pokemon.component.scss'],
})
export class PaginatePokemonComponent implements OnInit {

  speciePage$: Observable<Page<Specie>>;

  constructor(public specieApi: SpecieApi) { }

  ngOnInit(): void {
    this.speciePage$ = this.specieApi.list();
  }
}
