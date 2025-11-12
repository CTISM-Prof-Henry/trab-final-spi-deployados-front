import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoDialogComponent } from '../shared/agendamento-dialog/agendamento-dialog.component';
import { AuthService } from '../services/auth.service';
import { SalaService } from '../services/sala.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  salas: any[] = []; // lista de salas do backend
  salaSelecionada!: any; // sala escolhida pelo usuário

  refreshToken = 0;

  constructor(
    public dialog: MatDialog,
    private salaService: SalaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getCurrentUser();
    console.log('ID do usuário logado:', usuario?.idUsuario);
    this.carregarSalas();
  }

  tentarAgendar(): void {

    if (this.authService._isLoggedIn.value) {
      // Se o usuário ESTÁ logado, abre o modal de agendamento.
      this.abrirDialogAgendamento();
    } else {
      // Se o usuário NÃO ESTÁ logado, ele é redirecionado para a página de login.
      this.router.navigate(['/login']);
    }
  }

  carregarSalas(): void {
    this.salaService.listarTodas().subscribe({
      next: (res) => {
        this.salas = res;
        if (res.length > 0) {
          this.salaSelecionada = res[0];
          console.log(
            'Sala inicial selecionada no Dashboard:',
            this.salaSelecionada
          );
        }
      },
      error: (err) => console.error(err),
    });
  }

  salaMudou(sala: any) {
    console.log('Sala selecionada no Dashboard:', sala);
    this.refreshToken++;
  }

  abrirDialogAgendamento(): void {
    const dialogRef = this.dialog.open(AgendamentoDialogComponent, {
      width: '500px',
      panelClass: 'agendamento-dialog-panel',
      data: { sala: this.salaSelecionada },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O dialog foi fechado. Resultado:', result);
      if (result) {

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  blocoSelecionado: string = '';

  filtrarSalasPorBloco(bloco: string) {
    this.blocoSelecionado = bloco;
    this.salaService.listarPorBloco(bloco).subscribe({
      next: (res) => {
        this.salas = res;
        if (res.length > 0) {
          this.salaSelecionada = res[0];
        }
      },
      error: (err) => console.error(err),
    });
  }
}
