import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Darkmode } from './core/services/darkmode/darkmode';

import { ButtonModule } from 'primeng/button';
import { Main } from './layouts/main/main';
@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('FitnessApp');
}
