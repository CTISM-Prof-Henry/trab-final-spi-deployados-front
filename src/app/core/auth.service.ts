import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(true); //mudar aqui para validar login
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private router: Router) { }

  get isLoggedIn(): boolean {
    return this._isLoggedIn.getValue();
  }

  login(): void {
    this._isLoggedIn.next(true);
    this.router.navigate(['/']);
  }

  logout(): void {
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
