import { Component, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { ThemeFacade } from './core/Theme/theme.facade';
import { Auth } from './layouts/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themefacede = inject(ThemeFacade);
  isDark = signal(true);

  toggle() {
    this.isDark.update((v) => !v);
    this.themefacede.toggleTheme();
  }
}
