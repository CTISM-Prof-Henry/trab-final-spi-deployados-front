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
      // opcional: this.router.navigate(['/login']);
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

  // Alterna entre a visão de "Próximos" e "Histórico" ao clicar no botão
  toggleVisao(): void {
    this.mostrandoHistorico = !this.mostrandoHistorico;
    this.atualizarExibicao();
  }

  // Filtra a lista principal e atualiza a lista que é exibida na tela
  private atualizarExibicao(): void {
    const agora = new Date();

    if (this.mostrandoHistorico) {
      // Filtra para mostrar apenas agendamentos passados (histórico)
      this.agendamentosExibidos = this.todosAgendamentos
        .filter(ag => new Date(ag.dataFim) < agora)
        .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()); // Opcional: ordena o histórico do mais novo para o mais antigo
    } else {
      // Filtra para mostrar apenas agendamentos futuros
      this.agendamentosExibidos = this.todosAgendamentos
        .filter(ag => new Date(ag.dataFim) >= agora)
        .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()); // Opcional: ordena os próximos do mais perto para o mais longe
    }
  }

  voltarAoDashboard(): void {
    this.router.navigate(['/']);
  }
}
