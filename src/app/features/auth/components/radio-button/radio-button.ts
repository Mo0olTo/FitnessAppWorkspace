import { NgClass } from '@angular/common';
import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [RadioButtonModule],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
})
export class RadioButton {
  label = input.required<string>();
  value = input.required<any>();
  selectedValue = input<any>();

  @Output() valueChange = new EventEmitter<any>();

  select(): void {
    this.valueChange.emit(this.value());
  }

  isSelected = computed(() => this.selectedValue() === this.value());
}
