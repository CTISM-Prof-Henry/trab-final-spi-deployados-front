import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {AppComponent} from "../app.component";



@NgModule({
  declarations: [
    GenericButtonComponent,
    CustomInputComponent,
    CalendarioComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    FullCalendarModule,
  ],
  exports: [
    GenericButtonComponent,
    CustomInputComponent,
    CalendarioComponent,
  ]
})
export class SharedModule { }
