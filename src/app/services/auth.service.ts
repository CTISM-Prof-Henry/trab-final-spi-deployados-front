// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

import {UserData} from "../DTO/login.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario';
  private readonly USER_KEY = 'currentUser';
  _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  login(credentials: { cpf: string, senha: string }): Observable<any> {


    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(response => {

        localStorage.setItem(this.USER_KEY, JSON.stringify(response));
        this._isLoggedIn.next(true);
        this.router.navigate(['/']);
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        this._isLoggedIn.next(false);
        return throwError(() => new Error('CPF ou senha inválidos.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): UserData | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.tipoUsuario === 1 : false;
  }

  getCurrentUserId(): number | null {
    const u = this.getCurrentUser();
    if (!u) {
      return null;
    }

    return u.idUsuario ?? null;
  }
}
