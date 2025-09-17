export interface AgendamentoDTO {
  id: number;
  dataInicio: string; // LocalDateTime vem como ISO string do backend
  dataFim: string;
  status: string;
  usuarioId: number;
  usuarioNome: string;
  salaId: number;
  salaNome: string;
}
