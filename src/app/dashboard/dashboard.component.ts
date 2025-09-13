import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Este método é chamado quando o botão 'Agendar' é clicado.
   * Ele verifica se o usuário está logado antes de prosseguir.
   */
  tentarAgendar(): void {
    if (this.authService.isLoggedIn) {
      // Se o usuário ESTÁ logado, prossiga com a ação de agendar.
      // No futuro, isso abriria um modal/popup de agendamento.
      console.log('Usuário está logado. Abrindo modal de agendamento...');
      alert('FUNCIONALIDADE DE AGENDAMENTO (PARA USUÁRIOS LOGADOS)');
    } else {
      // Se o usuário NÃO ESTÁ logado, ele é redirecionado para a página de login.
      console.log('Usuário não está logado. Redirecionando para /login...');
      this.router.navigate(['/login']);
    }
  }
}
