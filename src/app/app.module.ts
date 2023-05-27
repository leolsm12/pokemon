import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CapitalizePipe, ConvertToCentimetersPipe, ConvertToKilogramsPipe } from './convert-to-unidades.pipe';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { InformacoesComponent } from './informacoes/informacoes.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PesquisaComponent,
    ConvertToCentimetersPipe,
    ConvertToKilogramsPipe,
    PesquisaComponent,
    PesquisaComponent,
    InformacoesComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }