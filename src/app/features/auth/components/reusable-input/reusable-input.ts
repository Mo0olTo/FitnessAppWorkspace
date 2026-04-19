import { Component, input, signal, Self, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationMsg } from '../validation-msg/validation-msg';
import { ICONS } from '../../../../styles/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-reusable-input',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ValidationMsg],
  templateUrl: './reusable-input.html',
  styleUrl: './reusable-input.scss',
})
export class ReusableInputComponent {
  type        = input<'text' | 'mail' | 'password'>('text');
  icon        = input<'user' | 'mail' | 'password' | 'eye' | null>(null);;
  passIcon    = input('icons/eye.png');
  label       = input('');
  placeholder = input('');
  customClass = input('');

  showPassword = signal(false);
  value        = signal<any>(''); 

  

  private _onChange: (val: any) => void = () => {};
  private _onTouched: () => void = () => {};


  constructor(@Self() public controlDir: NgControl , private sanitizer: DomSanitizer) {
    this.controlDir.valueAccessor = this;
  } 




  writeValue(val: any): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this._onChange(val);
  }

  onBlur(): void {
    this._onTouched();
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }



  iconSvg = computed((): SafeHtml | null => {
    const name = this.icon();
    const svg = name ? ICONS[name] : null;
  
    return svg
      ? this.sanitizer.bypassSecurityTrustHtml(svg)
      : null;
  });  

  eyeSvg = computed((): SafeHtml => {
    const iconName = this.showPassword() ? 'eyeOff' : 'eye';
    const svg = ICONS[iconName];
  
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  });


  
}