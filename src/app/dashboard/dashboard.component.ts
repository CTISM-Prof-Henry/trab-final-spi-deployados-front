import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoDialogComponent } from '../shared/agendamento-dialog/agendamento-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Este mtodo é chamado quando o botão 'Agendar' é clicado.
   * Ele verifica se o usuário está logado antes de prosseguir.
   */
  tentarAgendar(): void {
    if (this.authService.isLoggedIn) {
      // Se o usuário ESTÁ logado, prossiga com a ação de agendar.
      this.abrirDialogAgendamento();
    } else {
      // Se o usuário NÃO ESTÁ logado, ele é redirecionado para a página de login.
      this.router.navigate(['/login']);
    }
  }

  abrirDialogAgendamento(): void {
    const dialogRef = this.dialog.open(AgendamentoDialogComponent, {
      width: '500px', // Largura do dialog
      panelClass: 'agendamento-dialog-panel',
      // Você pode passar dados para o dialog aqui, se precisar
      // data: { sala: 'G-209' }
    });

    // Opcional: código para ser executado depois que o dialog for fechado
    dialogRef.afterClosed().subscribe((result) => {
      console.log('O dialog foi fechado. Resultado:', result);
      // Aqui você poderia, por exemplo, atualizar a lista de agendamentos
    });
  }
}
