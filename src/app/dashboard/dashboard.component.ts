import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoDialogComponent } from '../shared/agendamento-dialog/agendamento-dialog.component';
import {AuthService} from "../services/auth.service";

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
   * Este metodo é chamado quando o botão 'Agendar' é clicado.
   * Ele verifica se o usuário está logado antes de prosseguir.
   */
  tentarAgendar(): void {
    console.log('Tentando agendar...');
    if (this.authService._isLoggedIn.value) {
      this.abrirDialogAgendamento();
    } else {
      this.router.navigate(['/login']);
    }
  }

  abrirDialogAgendamento(): void {
    const dialogRef = this.dialog.open(AgendamentoDialogComponent, {
      width: '500px', // Largura do dialog
      panelClass: 'agendamento-dialog-panel',

    });

    // Opcional: código para ser executado depois que o dialog for fechado
    dialogRef.afterClosed().subscribe((result) => {
      console.log('O dialog foi fechado. Resultado:', result);
      // Aqui você poderia, por exemplo, atualizar a lista de agendamentos
    });
  }
}
