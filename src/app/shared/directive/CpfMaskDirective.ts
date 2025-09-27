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
    // se a diretiva foi colocada diretamente em um <input>, use ele.
    // senão, tente encontrar o <input> dentro do componente (app-custom-input).
    this.inputEl = native.tagName === 'INPUT' ? native as HTMLInputElement : native.querySelector?.('input');
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.inputEl ?? (this.el.nativeElement as HTMLInputElement);
    if (!input) return;

    // pega valor corrente (pode vir do usuário ou de evento programático)
    let value = input.value || '';

    // 1) remove não-dígitos e limita a 11 dígitos
    value = value.replace(/\D/g, '').slice(0, 11);

    // 2) aplica máscara CPF
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    // evita reprocessar o mesmo valor (evita loops)
    if (value === this.lastValue) return;
    this.lastValue = value;

    // 3) atualiza o DOM (o que o usuário vê)
    input.value = value;

    // 4) atualiza o FormControl (se existir) ou notifica o componente interno
    if (this.ngControl?.control) {
      // quando a diretiva estiver aplicada ao elemento que tem o formControlName,
      // podemos setar diretamente sem emitir eventos
      this.ngControl.control.setValue(value, { emitEvent: false });
    } else {
      // quando não há NgControl (caso de diretiva no <input> interno),
      // disparamos um evento input assincronamente para que o (input) do custom-input
      // receba o novo valor e chame onChange() do ControlValueAccessor.
      setTimeout(() => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }, 0);
    }
  }
}
