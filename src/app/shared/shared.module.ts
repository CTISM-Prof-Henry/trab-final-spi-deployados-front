import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import {CpfMaskDirective} from "./directive/CpfMaskDirective";
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    GenericButtonComponent,
    CustomInputComponent,
    CalendarioComponent,
    CpfMaskDirective,
    NotFoundComponentComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        FullCalendarModule,
        HttpClientModule,
        MatIconModule,
    ],
  exports: [
    GenericButtonComponent,
    CustomInputComponent,
    CalendarioComponent,
    CpfMaskDirective,
  ],
})
export class SharedModule {}
