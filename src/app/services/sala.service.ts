import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaDTO } from '../DTO/sala.dto';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private apiUrl = 'http://localhost:8080/salas'; // endpoint do backend

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<SalaDTO[]> {
    return this.http.get<SalaDTO[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<SalaDTO> {
    return this.http.get<SalaDTO>(`${this.apiUrl}/${id}`);
  }

  listarPorBloco(bloco: string) {
    return this.http.get<any[]>(`${this.apiUrl}/bloco/${bloco}`);
  }


  criar(sala: SalaDTO): Observable<SalaDTO> {
    return this.http.post<SalaDTO>(this.apiUrl, sala, { withCredentials: true });
  }

  atualizar(id: number, sala: SalaDTO): Observable<SalaDTO> {
    return this.http.put<SalaDTO>(`${this.apiUrl}/${id}`, sala, { withCredentials: true });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  atualizarStatus(id: number, ativo: boolean) {
    const params = new HttpParams().set('ativo', String(ativo));
    return this.http.put<SalaDTO>(`${this.apiUrl}/${id}/ativo`, null, { params });
  }
}

