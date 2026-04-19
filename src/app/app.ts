import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormTitle } from './features/auth/components/form-title/form-title';
import { Knob } from './features/auth/components/knob/knob';
import { FormButton } from './features/auth/components/form-button/form-button';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormTitle, Knob, FormButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('FitnessApp');
  progress = 1;
  isDisabled = true;
}
