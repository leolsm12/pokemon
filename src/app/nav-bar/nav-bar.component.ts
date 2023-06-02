import { Component } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    public getPokemon: GetPokemonService
  ){ }
  zerarOffset(){
    this.getPokemon.offset = 0
  }



}
