import { Component, OnInit } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokemon, IPokeFoto } from '../pokemon';



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
  evo = false;

  
  

  constructor(public getPokemon: GetPokemonService) { }
  
  ngOnInit() {
    this.getPokemon.getPokemons().subscribe(data => {
      this.pokemons = data?.results;
    this.loadImage();     
      
    });
    console.log(this.getPokemon.offset);

  }
  loadImage() {
    this.pokemonsFotos = [];
    for (const pokemon of this.pokemons) {
      this.getPokemon.getPokemonDetails(pokemon.url).subscribe((data:any) => {       
        const novaFoto: IPokeFoto = {
          nome: data.name.replace(/-/g, ' '),
          foto: data.sprites.other['official-artwork'].front_default,
          url: pokemon.url,
          tipo: data.types[0].type.name,
          number: data.id
        };
        this.pokemonsFotos.push(novaFoto);       
      });
    } 
    
    console.log(this.pokemonsFotos);     
    

  }


loadNext() {  
    this.getPokemon.loadNext();
    this.getPokemon.getPokemons().subscribe((data) => {
      this.pokemons = data?.results;
      
    });
    console.log(this.getPokemon.offset);
    
    this.loadImage();
            
  }

  loadPrevious() {
    this.getPokemon.loadPrevious();
    this.getPokemon.getPokemons().subscribe((data) => {
      this.pokemons = data?.results;
      
    });
    console.log(this.getPokemon.offset);
    this.loadImage();
  }

  getPokemonDetails(url: string) {
    console.log(url);
   
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
      data.stats.forEach((stat: { stat: any; }) => {
        this.pokemonDetails.stats.push(stat);
      });
      console.log(this.pokemonDetails.stats);
      const evoUrl = data.species.url;
      this.getPokemon.getPokemonDetails(evoUrl).subscribe((data: any) => {
        const url2 = data.evolution_chain.url;
        console.log(url2);
      });
      
      this.pokemonDetails.url = url;
      
      console.log(this.pokemonDetails.especies);
    });
  }

}