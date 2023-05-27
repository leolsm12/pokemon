import { Component, OnInit } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokemon } from '../pokemon';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  pokemons: IPokemon[] = [];

  constructor(private getPokemonService: GetPokemonService) {}

  ngOnInit(): void {
    this.getPokemonService.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
      console.log(data.results);
    });
  }
}
