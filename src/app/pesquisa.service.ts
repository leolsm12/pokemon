import { Injectable } from '@angular/core';
import { GetPokemonService } from './get-pokemon.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSource.asObservable();
  private notificarMetodoEmComponenteB = new Subject<void>();
  suggestedPokemonNames: string[] = [];
  constructor() {}

  updateSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
  notificarComponenteB() {
    this.notificarMetodoEmComponenteB.next();
  }

  // Método que ComponenteB assina para executar a lógica desejada
  onNotificarMetodoEmComponenteB() {
    return this.notificarMetodoEmComponenteB.asObservable();
  }
  

  setSuggestedPokemonNames(names: string[]) {
    this.suggestedPokemonNames = names;
  }

  getSuggestedPokemonNames() {
    return this.suggestedPokemonNames;
  }

}