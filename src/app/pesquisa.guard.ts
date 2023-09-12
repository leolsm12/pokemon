import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PesquisaGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifique se a rota atual é '/pesquisa'
    if (window.location.pathname === '/pesquisa') {
      // Redirecione para a página inicial
      this.router.navigate(['/pokemon']);
      return false; // Impede a ativação da rota '/pesquisa'
    }
    return true; // Permite a ativação de outras rotas
  }
}