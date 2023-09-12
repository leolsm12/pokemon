import { Component, HostListener, OnInit } from '@angular/core';
import { GetPokemonService } from '../get-pokemon.service';
import { IPokeEvo, IPokemon } from '../pokemon';
import { PesquisaService } from '../pesquisa.service';




@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css',
    '../pokemon/background.pokemon.css',
    './responsive.pesquisa.css'

  ]
})
export class PesquisaComponent implements OnInit {
  pokemon: any = {};
  pesquisa: any = '';
  evolucoes: any = [];
  evo: any[] = [];
  activeTab = 1;
  poke = false;
  alerta = false;
  offSetNames = '';
  pokemonsName: any = [];
  suggestedPokemonNames: string[] = this.pokemonsName;
  searchTerm: string = '';
  MyUrl = "https://pokeapi.co/api/v2/pokemon/";
  listaPk = true
  idPrincipal: any = '';
  idProximo: any = '';
  idAntes: any = '';


  constructor(
    private GetPokemon: GetPokemonService,
    public pesquisaService: PesquisaService
  ) { }

  dadosRecebidos: string = '';

  receberDados(dados: string) {
    this.dadosRecebidos = dados;
  }

  ngOnInit() {
    this.getPokemons();
    this.pesquisaService.currentSearchTerm.subscribe((term) => {
    this.searchTerm = term;
    });

    this.pesquisaService.onNotificarMetodoEmComponenteB().subscribe(() => {
    this.getInput();
    });
    this.getInput();
  }

  metodoEmComponenteB() {
    this.getInput();
    console.log('teste')
    // Coloque a lógica que você deseja executar em ComponenteB aqui
  }
  updateSuggestedNames(names: string[]) {
    this.pesquisaService.setSuggestedPokemonNames(names);
  }
  filterPokemonNames(searchTerm: string) {
    this.suggestedPokemonNames = this.pokemonsName.filter((name: any) =>
      name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }
  loadNext() {
    this.idProximo = this.idPrincipal + 1 ;
    console.log(this.idProximo);
    this.getPokemon(this.idProximo);
  }
  loadPrevius() {
    this.idAntes = this.idPrincipal - 1 ;
    this.getPokemon(this.idAntes);
  }

  getInput() {
    this.pesquisa = document.querySelector<HTMLInputElement>('input')?.value;
    this.pesquisa = this.pesquisa.toLowerCase().replace(/\s/g, '-');
    if ((this.pesquisa > 0 && this.pesquisa <= 1279) || this.pokemonsName.includes(this.pesquisa)) {
      this.poke = true;
      this.getPokemon(this.pesquisa);
      this.alerta = false;
      this.listaPk = false;
      this.pesquisa = '';

    } else {
      this.alerta = true;
    }
    console.log(this.pesquisa);
  }
  selectPokemonName(name: string) {
    console.log(name)
    this.getPokemon(name);
    this.poke = true;
    this.listaPk = false;


  }

  changeTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }

  getPokemon(pesquisa: string) {
    this.GetPokemon.getPokemonByName(pesquisa).subscribe((data: any) => {
      this.pokemon.numero = data.id;
      this.idPrincipal = data.id;
      this.pokemon.name = data.name.replace('-', ' ');
      this.pokemon.tipo = data.types[0].type.name;
      this.pokemon.tipos = data.types.map((type: any) => type.type.name);
      this.pokemon.imagem = data.sprites.other['official-artwork'].front_default;
      this.pokemon.imagem_2 = data.sprites.other['official-artwork'].front_female || data.sprites.front_default;
      this.pokemon.peso = data.weight;
      this.pokemon.altura = data.height;
      this.pokemon.stats = [];
      data.stats.forEach((stat: any) => { this.pokemon.stats.push(stat); });
      const evoUrl = data.species.url;
      this.GetPokemon.getPokemonDetails(evoUrl).subscribe((data: any) => {
        const url2 = data.evolution_chain.url;
        this.GetPokemon.getPokemonDetails(url2).subscribe((data: any) => {

          if (data.chain && data.chain.species && data.chain.species.name) {
            this.evolucoes.push(data.chain.species.name);
          }

          if (data.chain && data.chain.evolves_to && data.chain.evolves_to.length > 0 && data.chain.evolves_to[0].species && data.chain.evolves_to[0].species.name) {
            this.evolucoes.push(data.chain.evolves_to[0].species.name);
          }

          if (data.chain && data.chain.evolves_to && data.chain.evolves_to.length > 0 && data.chain.evolves_to[0].evolves_to && data.chain.evolves_to[0].evolves_to.length > 0 && data.chain.evolves_to[0].evolves_to[0].species && data.chain.evolves_to[0].evolves_to[0].species.name) {
            this.evolucoes.push(data.chain.evolves_to[0].evolves_to[0].species.name);
          }
          //if (this.evolucoes.includes(this.pokemon.name)) {
          //  this.evolucoes = this.evolucoes.filter((pokemon: any) => pokemon !== this.pokemon.name)
          //}
          console.log(this.evolucoes)
          for (const evo of this.evolucoes) {
            this.GetPokemon.getPokemonByName(evo).subscribe((data: any) => {
              const newEvo: any = {};
              newEvo.name = data.name.replace('-', ' ');
              newEvo.imagem = data.sprites.other['official-artwork'].front_default;
              newEvo.imagem_2 = data.sprites.other['official-artwork'].front_female || data.sprites.front_default;
              newEvo.url = data.name;
              newEvo.tipo = data.types[0].type.name;
              console.log(newEvo);
              this.evo.push(newEvo);
            });
          }
          this.evo = [];


        });
      });
      this.pokemon.url = data.url;
    });
    this.evolucoes = [];

  }

  getPokemons() {
    this.GetPokemon.getPokemons(0, 1280).subscribe(data => {
      this.pokemonsName = data?.results.map(pokemon => pokemon.name);

    });

  }



}




