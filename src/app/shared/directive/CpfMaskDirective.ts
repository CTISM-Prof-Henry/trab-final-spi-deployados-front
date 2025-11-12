import {Directive, ElementRef, HostListener, Input, Optional} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {
  private inputEl: HTMLInputElement | null = null;
  private lastValue = '';

  constructor(private el: ElementRef, @Optional() private ngControl: NgControl) {
    const native: any = this.el.nativeElement;

    this.inputEl = native.tagName === 'INPUT' ? native as HTMLInputElement : native.querySelector?.('input');
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.inputEl ?? (this.el.nativeElement as HTMLInputElement);
    if (!input) return;


    let value = input.value || '';


    value = value.replace(/\D/g, '').slice(0, 11);


    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }


    if (value === this.lastValue) return;
    this.lastValue = value;


    input.value = value;


    if (this.ngControl?.control) {

      this.ngControl.control.setValue(value, { emitEvent: false });
    } else {

      setTimeout(() => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }, 0);
    }
  }
}
