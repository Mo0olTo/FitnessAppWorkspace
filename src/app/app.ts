import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Darkmode } from './core/services/darkmode/darkmode';

import { ButtonModule } from 'primeng/button';
import { Header } from './core/components/header/header';
@Component({
  selector: 'app-root',
  imports: [ButtonModule, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('FitnessApp');
  private readonly darkmode = inject(Darkmode);

  theme = this.darkmode.currentTheme;

  toggle() {
    this.darkmode.toggleTheme();
  }
}
