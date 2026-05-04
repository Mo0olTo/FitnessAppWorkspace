import { Component, EventEmitter, input, Output } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-radio-button',
  imports: [RadioButtonModule],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
})
export class RadioButton {
  label = input.required<string>();
  value = input.required<any>();
  groupName = input<string>('fitness-group');
  selectedValue = input<any>();
  @Output() valueChange = new EventEmitter<string>();

  select(): void {
    this.valueChange.emit(this.value());
  }
}
