import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { InformacoesComponent } from './informacoes/informacoes.component';



const routes: Routes = [
  { path: "", component: PokemonComponent},
  { path: "pokemon", component: PokemonComponent },
  { path: "pesquisa", component: PesquisaComponent },
  { path: "informacoes", component: InformacoesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
