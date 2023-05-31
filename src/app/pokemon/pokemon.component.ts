import { Component, OnInit, Renderer2 } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokemon, IPokeFoto, IPokeEvo } from '../pokemon';




@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  
  pokemons: IPokemon[] = [];
  pokemonDetails: any = {};
  url='';
  poke = false;
  pokemonsFotos: any = [];
  pokemon: IPokemon | null = null;
  activeTab = 1;
  valor: number = 75;
  itemSelecionado: number = -1;
  elementosLi = document.querySelectorAll('.lista-pk li');
  cardSelected = true;
  

  
  

  constructor(
    public getPokemon: GetPokemonService,
    private renderer: Renderer2
    ) { }
  
  ngOnInit() {
    this.getPokemon.getPokemons().subscribe(data => {
      this.pokemons = data?.results;
    this.loadImage();     
    });    
  }

  loadImage() {
    this.pokemonsFotos = [];
    for (const pokemon of this.pokemons) {
      this.getPokemon.getPokemonDetails(pokemon.url).subscribe((data:any) => {       
        const novaFoto: IPokeFoto = {
          nome: data.name.replace(/-/g, ' '),
          foto: data.sprites.other['official-artwork'].front_default,
          fotoR:data.sprites.other['official-artwork'].front_shiny,
          url: pokemon.url,
          tipo: data.types[0].type.name,
          number: data.id
        };
        this.pokemonsFotos.push(novaFoto);      
        this.pokemonsFotos.sort((a: { number: number; }, b: { number: number; }) => a.number - b.number);     
        this.cardSelected = true;
      }); 
    } 
  }

  loadNext() {  
    this.getPokemon.loadNext();
    this.getPokemon.getPokemons().subscribe((data) => {
      this.pokemons = data?.results;
      this.loadImage();
      this.poke = false;
      this.cardSelected = false; 
      this.selecionarItem(0);
   });
  }

  loadPrevious() {
    this.getPokemon.loadPrevious();
    this.getPokemon.getPokemons().subscribe((data) => {
      this.pokemons = data?.results;
      this.loadImage(); 
      this.poke = false 
      this.cardSelected = false; 
      this.selecionarItem(0);    
    });
  }

  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
  selecionarItem(index: number) {
    if(this.cardSelected === true){
    this.itemSelecionado = index;
    } else {
      this.itemSelecionado = 21;
    } 
  }

  div(){
    document.querySelectorAll('.lista-pk li').forEach((elementoLi): void => {
      this.renderer.setStyle(elementoLi, 'width', '20%');
    });
  }

  getPokemonDetails(url: string) {   
    this.getPokemon.getPokemonDetails(url).subscribe((data: any) => {
      this.pokemonDetails.numero = data.id;
      this.pokemonDetails.name = data.name.replace('-', ' ');
      this.pokemonDetails.tipo = data.types[0].type.name;
      this.pokemonDetails.tipos = data.types.map((type: any) => type.type.name);
      this.pokemonDetails.imagem = data.sprites.other['official-artwork'].front_default;
      this.pokemonDetails.imagem_2 = data.sprites.other['official-artwork'].front_female || data.sprites.front_default;
      this.pokemonDetails.evolucoes = [];
      this.pokemonDetails.peso = data.weight;
      this.pokemonDetails.altura = data.height;
      this.pokemonDetails.stats = [];
      data.stats.forEach((stat: { stat: any; }) => {this.pokemonDetails.stats.push(stat);});
      const evoUrl = data.species.url;
      this.getPokemon.getPokemonDetails(evoUrl).subscribe((data: any) => {
        const url2 = data.evolution_chain.url;
        this.getPokemon.getPokemonDetails(url2).subscribe((data: any) => {
          console.log(data);
           const newEvo: IPokeEvo = {
             species: data.chain.species.name, url:data.chain.species.url, 
             species1: data.chain.evolves_to[0].species.name, url1: data.chain.evolves_to[0].species.url,
             species2: data.chain.evolves_to[0].evolves_to[0].species.name, url2:data.chain.evolves_to[0].evolves_to[0].species.url,
           }
        });
      });      
      this.pokemonDetails.url = url;
    });
  }

  scrollToTop() {
    const top = 0;
    const behavior = 'smooth';
    this.renderer.setProperty(document.documentElement, 'scrollTop', top);
    this.renderer.setProperty(document.body, 'scrollTop', top);
  }
}