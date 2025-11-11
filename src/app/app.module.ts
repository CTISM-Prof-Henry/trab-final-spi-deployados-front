import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from './shared/shared.module';
import { AgendamentoDialogComponent } from './shared/agendamento-dialog/agendamento-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { GerenciarSalasComponent } from './admin/gerenciar-salas/gerenciar-salas.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MeusAgendamentosComponent } from './meus-agendamentos/meus-agendamentos.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, AgendamentoDialogComponent, GerenciarSalasComponent, MeusAgendamentosComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //RouterModule,
    AuthModule,
    LayoutModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    LayoutModule,
    LayoutModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
