import {UserData} from "../../DTO/login.dto";
import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  currentUser: UserData | null = null;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.currentUser = this.authService.getCurrentUser();
    });
  }

  get userRole(): string {
    const tipo = this.currentUser?.tipoUsuario;
    switch (tipo) {
      case 1: return 'Administrador';
      case 2: return 'Professor / Servidor';
      case 3: return 'Aluno';
      default: return 'Usuário';
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }


  gerenciarSalas(): void {
    this.router.navigate(['/admin/salas']);
  }


  meusAgendamentos(): void {
    this.router.navigate(['/meus-agendamentos']);
  }

  logout(): void {
    this.authService.logout();
  }
}
