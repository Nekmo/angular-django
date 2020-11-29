import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon, PokemonApi} from '../../shared/api.service';

@Component({
  selector: 'app-retrieve-pokemon',
  templateUrl: './retrieve-pokemon.component.html',
  styleUrls: ['./retrieve-pokemon.component.scss']
})
export class RetrievePokemonComponent implements OnInit {

  pokemon$: Observable<Pokemon>;

  constructor(public apiPokemon: PokemonApi) { }

  ngOnInit(): void {
    this.pokemon$ = this.apiPokemon.retrieve(1);
  }

}
