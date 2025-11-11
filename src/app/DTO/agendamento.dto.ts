export interface AgendamentoDTO {
  id_agendamento?: number;
  dataInicio: string;
  dataFim: string;
  status?: string;
  usuarioId: number;
  usuarioNome: string;
  salaId: number;
  salaNome: string;
}

