import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { PesquisaService } from '../pesquisa.service';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit {
  @ViewChild(PesquisaComponent) pesquisa!: PesquisaComponent;
  searchTerm: string = '';
  input: string | any =  '';
  suggestedPokemonNames: string[] = [];

  constructor(
    public getPokemon: GetPokemonService,
    public pesquisaService: PesquisaService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {

    this.suggestedPokemonNames = this.pesquisaService.getSuggestedPokemonNames();
    console.log(this.suggestedPokemonNames);
  }
  chamarMetodoComponenteB() {
    this.pesquisaService.updateSearchTerm(this.searchTerm);
    this.pesquisaService.notificarComponenteB();
    this.router.navigate(['/pesquisa']);
    
  }
  mudarPagina() {
    this.router.navigate(['/pesquisa']);
  }
  
  zerarOffset(){
    this.getPokemon.offset = 0
  }

}
