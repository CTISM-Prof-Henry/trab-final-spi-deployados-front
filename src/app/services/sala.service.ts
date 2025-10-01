import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
