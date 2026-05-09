import { Component, input, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ICONS } from '../../../../styles/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-reusable-input',
  standalone: true,
  imports: [CommonModule, InputTextModule],
  templateUrl: './reusable-input.html',
  styleUrl: './reusable-input.scss',
})
export class ReusableInput {
  // (,'') =======>  signals inputs & outputs

  type = input<'text' | 'email' | 'password'>('text');
  icon = input<'user' | 'email' | 'password' | 'eye' | null>(null);
  label = input('');
  placeholder = input('');
  customClass = input('');
  value = input<string>('');
  valueChange = output<string>();
  blur = output<void>();

  // (,'') =======> internal state
  showPassword = signal(false);

  constructor(private sanitizer: DomSanitizer) {}

  // (,'') =======>  events

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onBlur(): void {
    this.blur.emit();
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  // (,'') =======> icons

  iconSvg = computed((): SafeHtml | null => {
    const name = this.icon();
    const svg = name ? ICONS[name] : null;

    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  });

  eyeSvg = computed((): SafeHtml => {
    const iconName = this.showPassword() ? 'eyeOff' : 'eye';
    return this.sanitizer.bypassSecurityTrustHtml(ICONS[iconName]);
  });
}
