import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgendamentoDTO } from '../DTO/agendamento.dto';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:8080/agendamentos'; // endpoint do backend

  constructor(private http: HttpClient) {}

  getAgendamentos(): Observable<AgendamentoDTO[]> {
    return this.http.get<AgendamentoDTO[]>(this.apiUrl);
  }
}
