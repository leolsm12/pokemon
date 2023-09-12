import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { PesquisaGuard } from './pesquisa.guard';



const routes: Routes = [
  { path: "", component: PokemonComponent},
  { path: "pokemon", component: PokemonComponent },
  { path: "pesquisa", component: PesquisaComponent, canActivate: [PesquisaGuard], },
  { path: "informacoes", component: InformacoesComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
