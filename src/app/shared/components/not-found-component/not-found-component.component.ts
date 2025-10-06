import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found-component.component.html',
  styleUrls: ['./not-found-component.component.css']
})
export class NotFoundComponentComponent {

  constructor(private router: Router) { }

  voltarParaInicio(): void {
    this.router.navigate(['/']);
  }

}
