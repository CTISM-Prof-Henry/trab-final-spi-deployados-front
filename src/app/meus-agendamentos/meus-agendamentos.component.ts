import { Component, OnInit } from '@angular/core';
import { AgendamentoDTO } from '../DTO/agendamento.dto';
import { AgendamentoService } from '../services/agendamento.service';
import {AuthService} from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrls: ['./meus-agendamentos.component.css']

})
export class MeusAgendamentosComponent implements OnInit {

  private todosAgendamentos: AgendamentoDTO[] = [];

  agendamentosExibidos: AgendamentoDTO[] = [];

  mostrandoHistorico = false;
  isLoading = true;

  constructor(
    private agendamentoService: AgendamentoService,
    private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.carregarMeusAgendamentos();
  }

  carregarMeusAgendamentos(): void {
    const usuarioId = this.authService.getCurrentUserId();

    if (usuarioId == null) {
      console.error('Usuário não logado ou sem ID.');
      this.isLoading = false;

      return;
    }
    this.isLoading = true;
    this.agendamentoService.getAgendamentosPorUsuario(usuarioId).subscribe(
      (agendamentos) => {
        this.todosAgendamentos = agendamentos;
        this.atualizarExibicao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
        this.isLoading = false;
      }
    );
  }


  toggleVisao(): void {
    this.mostrandoHistorico = !this.mostrandoHistorico;
    this.atualizarExibicao();
  }


  private atualizarExibicao(): void {
    const agora = new Date();

    if (this.mostrandoHistorico) {

      this.agendamentosExibidos = this.todosAgendamentos
        .filter(ag => new Date(ag.dataFim) < agora)
        .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()); // Opcional: ordena o histórico do mais novo para o mais antigo
    } else {

      this.agendamentosExibidos = this.todosAgendamentos
        .filter(ag => new Date(ag.dataFim) >= agora)
        .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()); // Opcional: ordena os próximos do mais perto para o mais longe
    }
  }

  voltarAoDashboard(): void {
    this.router.navigate(['/']);
  }
}
