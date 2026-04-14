import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Message } from 'primeng/message'

@Component({
  selector: 'app-validation-msg',
  imports: [Message],
  templateUrl: './validation-msg.html',
  styleUrl: './validation-msg.scss',
})
export class ValidationMsg {
  control = input.required<AbstractControl>();
  label   = input('');
  type    = input('');
}
