import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-button',
  imports: [],
  templateUrl: './form-button.html',
  styleUrl: './form-button.scss',
})
export class FormButton {
  btnTitle=input<string>('') 
  disabled=input<boolean>(false)
}
