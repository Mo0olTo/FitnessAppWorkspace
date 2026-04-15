import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {
  title = input<string>('');
  customBg = input<string>('');
  border = input<string>('');
  color = input<string>('');
  colorBtn = input<string>('');
  width = input<string>('');
}
