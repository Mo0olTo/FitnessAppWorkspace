import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-radio-button',
  imports: [RadioButtonModule, FormsModule],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
})
export class RadioButton {
  label = input.required<string>();

  value = input.required<any>();

  groupName = input<string>('fitness-group');

  selectedValue = model<any>();

  select(): void {
    this.selectedValue.set(this.value());
  }
}
