import { Component } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent {
poke = true;
evolucoes: any = [] ;
pokemonDetails: any = {};
evo:any[] = [];
activeTab = 1;

constructor(
  public getPokemon: GetPokemonService
  
  ) { }

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
  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
