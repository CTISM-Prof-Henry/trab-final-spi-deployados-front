import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAdmin()) {
      // Se for admin, permite o acesso à rota
      return true;
    } else {
      // --- LÓGICA DA MENSAGEM ---
      // 3. Se NÃO for admin, exibe a notificação
      this.snackBar.open('Acesso negado. Você não tem permissão para acessar esta página.', 'Fechar', {
        duration: 5000, // A mensagem desaparecerá após 10 segundos
        verticalPosition: 'top', // Posição na tela
        horizontalPosition: 'center',
        panelClass: ['error-snackbar'] // Classe CSS para customização (opcional)
      });

      // 4. Redireciona para a página principal
      this.router.navigate(['/']);

      // E bloqueia o acesso à rota atual
      return false;
    }
  }
}
