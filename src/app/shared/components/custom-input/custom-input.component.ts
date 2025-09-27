import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() cpfMask: boolean = false;

  value: string = '';

  // Guarda as funções que o Angular nos dá para notificar mudanças
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  /**
   * Chamado pelo Angular para definir o valor inicial do campo.
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Chamado pelo Angular para nos dar a função de "callback"
   * que devemos chamar quando o valor mudar.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Chamado pelo Angular para nos dar a função de "callback"
   * que devemos chamar quando o usuário "tocar" no campo (evento blur).
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Nosso mtodo interno para lidar com o evento 'input' do campo HTML.
   * Ele atualiza o valor interno e notifica o Angular da mudança.
   */
  onValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
