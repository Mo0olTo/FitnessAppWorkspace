import { Component, computed, input } from '@angular/core';
import { Message } from 'primeng/message'

@Component({
  selector: 'app-validation-msg',
  imports: [Message],
  templateUrl: './validation-msg.html',
  styleUrl: './validation-msg.scss',
})
export class ValidationMsg {
  errors = input<any>(null);
  touched = input(false);
  label = input('');
  type = input('');

  showErrors = computed(() => {
    return this.touched() && this.errors();
  });
}
