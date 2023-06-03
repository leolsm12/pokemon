import { Component, HostListener, OnInit } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokeEvo, IPokemon } from '../pokemon';



@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html', 
  styleUrls: ['./pesquisa.component.css',
               '../pokemon/background.pokemon.css' 
            ]
})
export class PesquisaComponent implements OnInit {
  pokemon:any = {};
  pesquisa: any = '';
  activeTab = 1;
  poke = false;
  tamanhoDaTela: number;
  alerta = false;
  offSetNames = '';
  pokemonsName: any = [] ;
  MyUrl = "https://pokeapi.co/api/v2/pokemon/";
  telaPequena = false;
  telaGrande = false;
   
 
  

  constructor( 
    private GetPokemon: GetPokemonService 
   
    ) {
      this.tamanhoDaTela = window.innerWidth;

  }

  ngOnInit() {
  this.getPokemons();
  console.log(this.telaGrande)
  console.log(this.telaPequena)
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.tamanhoDaTela = window.innerWidth;
  }
  isTelaPequena(): boolean {
    return this.tamanhoDaTela < 440; 
  }
  celular(){
    if(this.isTelaPequena() === true){
      this.telaPequena = true
    }else{
      this.telaGrande = true
    }
  }
  


  getInput(){
    this.pesquisa = document.querySelector<HTMLInputElement>('input')?.value;
    this.pesquisa = this.pesquisa.toLowerCase().replace(/\s/g, '-');
    
    if((this.pesquisa > 0 && this.pesquisa <= 1279 ) || this.pokemonsName.includes(this.pesquisa)){
    this.getPokemon();
    this.poke = true;
    this.alerta = false;
    this.pesquisa = '';
    } else{
      this.alerta = true;
    }
  }

  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
  
  getPokemon(){
    this.GetPokemon.getPokemonByName(this.pesquisa).subscribe((data: any) => {
      this.pokemon.numero = data.id;
      this.pokemon.name = data.name.replace('-', ' ');
      this.pokemon.tipo = data.types[0].type.name;
      this.pokemon.tipos = data.types.map((type: any) => type.type.name);
      this.pokemon.imagem = data.sprites.other['official-artwork'].front_default;
      this.pokemon.imagem_2 = data.sprites.other['official-artwork'].front_female || data.sprites.front_default;
      this.pokemon.evolucoes = [];
      this.pokemon.peso = data.weight;
      this.pokemon.altura = data.height;
      this.pokemon.stats = [];
      data.stats.forEach((stat:  any ) => {this.pokemon.stats.push(stat);});
      const evoUrl = data.species.url;
      this.GetPokemon.getPokemonDetails(evoUrl).subscribe((data: any) => {
        const url2 = data.evolution_chain.url;
        this.GetPokemon.getPokemonDetails(url2).subscribe((data: any) => {
          console.log(data);
           const newEvo: IPokeEvo = {
             species: data.chain.species.name, url:data.chain.species.url, 
             species1: data.chain.evolves_to[0].species.name, url1: data.chain.evolves_to[0].species.url,
             species2: data.chain.evolves_to[0].evolves_to[0].species.name, url2:data.chain.evolves_to[0].evolves_to[0].species.url,
           }
           this.pokemon.evolucoes.push(newEvo);
           console.log(this.pokemon.evolucoes);
        });
      });      
      this.pokemon.url = data.url;
    });
    this.pokemon.evolucoes = [];
    console.log(this.pokemon);
  }

  getPokemons(){
  this.GetPokemon.getPokemons(0, 1280).subscribe(data => {
    this.pokemonsName = data?.results.map(pokemon => pokemon.name);
    
  });
}
   

}




