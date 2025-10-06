import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../shared/shared.module";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    NavbarComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        SharedModule,
        MatListModule,
    ],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule { }
