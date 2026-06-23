import { Component, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { ThemeFacade } from './core/Theme/theme.facade';
import { Loading } from './shared/components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Injection here so that the service works as soon as the site opens
  private readonly themefacede = inject(ThemeFacade);
  // isDark = signal(true);
  // toggle() {
  //   this.isDark.update((v) => !v);
  //   this.themefacede.toggleTheme();
  // }
}
