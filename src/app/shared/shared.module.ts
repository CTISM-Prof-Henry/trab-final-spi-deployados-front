import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import { CustomInputComponent } from './components/custom-input/custom-input.component';



@NgModule({
  declarations: [
    GenericButtonComponent,
    CustomInputComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    GenericButtonComponent,
    CustomInputComponent
  ]
})
export class SharedModule { }
