import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Para guardar a mensagem de erro

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Cria o formulário com campos e validadores
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(14)]],
      senha: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = null;

    // Pega os dados do formulário
    const credentials = { ...this.loginForm.value };

    // Remove a máscara do CPF (fica só números)
    credentials.cpf = credentials.cpf.replace(/\D/g, '');

    console.log("Enviando pro backend:", credentials);

    this.authService.login(credentials).subscribe({
      next: () => console.log('Login bem-sucedido!'),
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage = 'CPF ou senha inválidos. Verifique suas credenciais.';
      }
    });
  }


  voltar(): void {
    this.router.navigate(['/']); // Navega para a rota raiz (seu dashboard)
  }
}
