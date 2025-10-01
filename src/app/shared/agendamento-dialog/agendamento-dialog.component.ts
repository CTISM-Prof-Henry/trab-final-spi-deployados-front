import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgendamentoDTO } from 'src/app/DTO/agendamento.dto';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agendamento-dialog',
  templateUrl: './agendamento-dialog.component.html',
  styleUrls: ['./agendamento-dialog.component.css'],
})
export class AgendamentoDialogComponent implements OnInit {
  dataInicio!: string;
  horaInicio!: string;
  dataFim!: string;
  horaFim!: string;
  salaNome!: string;

  usuarioLogado: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // data.sala vem do dashboard
    private dialogRef: MatDialogRef<AgendamentoDialogComponent>,
    private agendamentoService: AgendamentoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getCurrentUser();
    console.log('Usuário logado:', this.usuarioLogado);
  }

  confirmarAgendamento() {
    const dataInicioCompleta = new Date(
      `${this.dataInicio}T${this.horaInicio}`
    );
    const dataFimCompleta = new Date(`${this.dataFim}T${this.horaFim}`);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const agendamentoPayload: AgendamentoDTO = {
      salaId: this.data.sala.idSala,
      usuarioId: this.usuarioLogado?.idUsuario,
      dataInicio: `${dataInicioCompleta.getFullYear()}-${pad(
        dataInicioCompleta.getMonth() + 1
      )}-${pad(dataInicioCompleta.getDate())}T${pad(
        dataInicioCompleta.getHours()
      )}:${pad(dataInicioCompleta.getMinutes())}`,
      dataFim: `${dataFimCompleta.getFullYear()}-${pad(
        dataFimCompleta.getMonth() + 1
      )}-${pad(dataFimCompleta.getDate())}T${pad(
        dataFimCompleta.getHours()
      )}:${pad(dataFimCompleta.getMinutes())}`,
      usuarioNome: '',
      salaNome: this.data.sala.nomeSala,
    };

    this.agendamentoService.criarAgendamento(agendamentoPayload).subscribe({
      next: (res) => {
        console.log('Agendamento criado com sucesso', res);
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Erro ao criar agendamento', err),
    });
  }
}
