import { Component, OnInit, Renderer2 } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokemon, IPokeFoto, IPokeEvo } from '../pokemon';




@Component({
  selector: 'app-pokemon',
  templateUrl: 'pokemon.component.html',
  styleUrls: ['pokemon.component.css', './cardDetail.css', 'responsive.pokemon.css', './background.pokemon.css']
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
  cardSelected = true;
  evolucoes: any = [] ;
  evo:any[] = [];
  

  
  

  constructor(
    public getPokemon: GetPokemonService,
    private renderer: Renderer2
    ) { }
  
  ngOnInit() {
    this.getPokemon.getPokemons(this.getPokemon.offset, this.getPokemon.limit).subscribe(data => {
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
    this.getPokemon.getPokemons(this.getPokemon.offset, this.getPokemon.limit).subscribe((data) => {
      this.pokemons = data?.results;
      this.loadImage();
      this.poke = false;
      this.cardSelected = false; 
      this.selecionarItem(0);
      this.divOff(); 
   });
  }

  loadPrevious() {
    this.getPokemon.loadPrevious();
    this.getPokemon.getPokemons(this.getPokemon.offset, this.getPokemon.limit).subscribe((data) => {
      this.pokemons = data?.results;
      this.loadImage(); 
      this.poke = false 
      this.cardSelected = false; 
      this.selecionarItem(0);  
      this.divOff();  
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
      this.renderer.setStyle(elementoLi, 'width', '23%');
    });
    document.querySelectorAll('.lista-pk').forEach((elementoLi): void => {
      this.renderer.setStyle(elementoLi, 'left', '1rem');
    });
  }
  divOff(){
    document.querySelectorAll('.lista-pk').forEach((elementoLi): void => {
      this.renderer.setStyle(elementoLi, 'left','');
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
          if (data.chain && data.chain.species && data.chain.species.name) {
            this.evolucoes.push(data.chain.species.name);
          }
          
          if (data.chain && data.chain.evolves_to && data.chain.evolves_to.length > 0 && data.chain.evolves_to[0].species && data.chain.evolves_to[0].species.name) {
            this.evolucoes.push(data.chain.evolves_to[0].species.name);
          }
          
          if (data.chain && data.chain.evolves_to && data.chain.evolves_to.length > 0 && data.chain.evolves_to[0].evolves_to && data.chain.evolves_to[0].evolves_to.length > 0 && data.chain.evolves_to[0].evolves_to[0].species && data.chain.evolves_to[0].evolves_to[0].species.name) {
            this.evolucoes.push(data.chain.evolves_to[0].evolves_to[0].species.name);
          }
           if(this.evolucoes.includes(this.pokemonDetails.name)){
             this.evolucoes = this.evolucoes.filter((pokemon:any)=> pokemon !== this.pokemonDetails.name)
           }
           console.log(this.evolucoes)
           for(const evo of this.evolucoes){
           this.getPokemon.getPokemonByName(evo).subscribe((data: any) => {
            const newEvo:any = {};
            newEvo.name = data.name.replace('-', ' ');
            newEvo.imagem = data.sprites.other['official-artwork'].front_default;
            newEvo.imagem_2 = data.sprites.other['official-artwork'].front_female || data.sprites.front_default; 
            newEvo.url = `https://pokeapi.co/api/v2/pokemon/${data.name}`;
            console.log(newEvo);
            this.evo.push(newEvo);
            
           });
          }
          this.evo = [];
          console.log(this.evo);
           
           
        });
      });      
      this.pokemonDetails.url = data.url;
    });
    this.evolucoes = [];
    
  }


  scrollToTop() {
    const top = 0;
    const behavior = 'smooth';
    this.renderer.setProperty(document.documentElement, 'scrollTop', top);
    this.renderer.setProperty(document.body, 'scrollTop', top);
  }
}