import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from './pokemon';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetPokemonService {
  myURL = "https://pokeapi.co/api/v2/pokemon";
  offset = 0;
  
  
  constructor(private http: HttpClient,) {}


  loadNext(){
    if(this.offset === 1280){
      this.offset = 1280
    }else{
      this.offset += 20;
      this.getPokemons();
    };
    
  }
  loadPrevious(){
    if(this.offset === 0){
      this.offset = 0
    }else{
      this.offset -= 20;
      this.getPokemons();
    };
  }
  getPokemons(): Observable<{results: IPokemon[]}> {
    return this.http.get<{results: IPokemon[]}>(`${this.myURL}?limit=20&offset=${this.offset}`);
    
  
  }
  
  getPokemonDetails(url: string): Observable<IPokemon> {
    return this.http.get<IPokemon>(url);
  }

  getPokemonEvolution(url: string): Observable<any> {
    return this.http.get(url);
  }
}

1281