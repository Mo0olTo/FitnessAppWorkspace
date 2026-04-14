import { Component, inject, signal } from '@angular/core';
import { Darkmode } from './core/services/darkmode/darkmode';

import { ButtonModule } from 'primeng/button';
import { ReusableInputComponent } from "./shared/components/reusable-input/reusable-input";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [ButtonModule, ReusableInputComponent ,FormsModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FitnessApp');
  private readonly darkmode=inject(Darkmode)
   
  theme= this.darkmode.currentTheme 

  fb=inject(FormBuilder)

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName:  ['', [Validators.required, Validators.minLength(2)]],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/)]],
  }); 



  onSubmit(){
    console.log(this.form.value);
  }

  toggle() {
    this.darkmode.toggleTheme();
  }
}
