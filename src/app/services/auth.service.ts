import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

// Interface para tipar a resposta que esperamos do backend
import {UserData} from "../DTO/login.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL do seu backend. Ajuste a porta se for diferente.
  private apiUrl = 'http://localhost:8080/usuario';

  // Chave para salvar os dados no localStorage
  private readonly USER_KEY = 'currentUser';

  // O BehaviorSubject agora inicia com base no que está salvo no localStorage
  _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient // 2. Injete o HttpClient no construtor
  ) { }

  private hasToken(): boolean {
    // Verifica se existem dados do usuário no localStorage ao iniciar
    return !!localStorage.getItem(this.USER_KEY);
  }

  // 3. Mtodo login atualizado para fazer a chamada HTTP
  login(credentials: { cpf: string, senha: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Se a requisição for bem-sucedida (status 200 OK)
        // 1. Salva a resposta (dados do usuário) no localStorage
        localStorage.setItem(this.USER_KEY, JSON.stringify(response));

        // 2. Emite 'true' para todos que observam o estado de login
        this._isLoggedIn.next(true);

        // 3. Navega para a página principal
        this.router.navigate(['/']);
      }),
      catchError(error => {
        // Se o backend retornar um erro (ex: 401 Unauthorized)
        console.error('Erro no login:', error);
        this._isLoggedIn.next(false); // Garante que o estado de login é falso
        return throwError(() => new Error('CPF ou senha inválidos.')); // Propaga o erro para o componente
      })
    );
  }

  // 4. Mtodo logout atualizado para limpar o localStorage
  logout(): void {
    localStorage.removeItem(this.USER_KEY); // Remove os dados do usuário
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Mtodo extra para pegar os dados do usuário logado, se necessário
  getCurrentUser(): UserData | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
