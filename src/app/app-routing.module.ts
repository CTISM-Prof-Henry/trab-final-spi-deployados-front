import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

// Aqui definimos nossas rotas
const routes: Routes = [
  // Se o usuário acessar a raiz do site (''), redirecione-o para a página de login
  { path: '', component: DashboardComponent },

  // Se o usuário acessar a URL '/login', mostre o LoginComponent
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '' }


  // { path: 'dashboard', component: DashboardComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
