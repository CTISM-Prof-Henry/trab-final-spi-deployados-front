import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NotFoundComponentComponent} from "./shared/components/not-found-component/not-found-component.component";
import {GerenciarSalasComponent} from "./admin/gerenciar-salas/gerenciar-salas.component";
import {AdminGuard} from "./guards/AdminGuard";
import {MeusAgendamentosComponent} from "./meus-agendamentos/meus-agendamentos.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },

  { path: 'login', component: LoginComponent },

  {
    path: 'admin/salas',
    component: GerenciarSalasComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'meus-agendamentos',
    component: MeusAgendamentosComponent,
   },

  { path: '**', component: NotFoundComponentComponent }

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
