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
  currentUser: UserData | null = null; // A propriedade que estava faltando

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Escuta as alterações de login
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.currentUser = this.authService.getCurrentUser();
    });
  }

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
