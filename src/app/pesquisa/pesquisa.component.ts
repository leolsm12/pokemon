import { Component, HostListener, OnInit } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokemon } from '../pokemon';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
   pokemon: IPokemon;
   pesquisa: any = '';
   activeTab = 1;
   poke = false;
   tamanhoDaTela: number;
 
  

  constructor( 
    private getPokemonService: GetPokemonService, 
    ) {
      this.tamanhoDaTela = window.innerWidth;
      this.pokemon = {
        numero: 0,
        name: '',
        tipos: [],
        imagem: '',
        imagem_2: '',
        evolucoes: [],
        peso: 0,
        altura: 0,
        stats: [],
        stat: [],
        especies: [],
        url: ''
    }
  }

  ngOnInit() {
  console.log(this.isTelaPequena())
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.tamanhoDaTela = window.innerWidth;
    console.log(event);
  }
  isTelaPequena(): boolean {
    return this.tamanhoDaTela < 440; // Exemplo: tela pequena se largura for menor que 768px
  
}

  getInput(){
    this.pesquisa = document.querySelector<HTMLInputElement>('input')?.value;
    this.getPokemon();
   console.log(this.pesquisa);
    this.pesquisa = 0;
    console.log(this.pesquisa);
    this.poke = true;
  }
  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  getPokemon(){
    this.getPokemonService.getPokemonByName(this.pesquisa).subscribe((data: any) => {
      this.pokemon = {
        numero: data.id,
        name: data.name,
        tipos: data.types.map((type: any) => type.type.name),
        imagem: data.sprites.other['official-artwork'].front_default,
        imagem_2: '',
        evolucoes: [],
        peso: data.weight,
        altura: data.height,
        stats: data.stats.map((stat: any) => ({
          nome: stat.stat.name,
          base_stat: stat.base_stat
        })),
        stat: [],
        especies: [],
        url: ""

      }
      console.log(data);
      console.log(this.pokemon);
    });
  }


}

function onWindowResize(event: Event | undefined, any: any) {
  throw new Error('Function not implemented.');
}

