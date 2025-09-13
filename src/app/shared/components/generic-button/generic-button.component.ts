import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent {

  @Input() text: string = 'Botão';
  @Input() color: 'primary' | 'success' |  "primary-light" |'warn' = 'primary' ;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() tooltipText: string = '';

  @Output() buttonClick = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.buttonClick.emit();
  }

}
