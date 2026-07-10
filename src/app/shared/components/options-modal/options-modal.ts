import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-options-modal',
  imports: [],
  templateUrl: './options-modal.html',
  styleUrl: './options-modal.scss',
})
export class OptionsModal {
  title = input<string>();
  options = input<string[]>();
  isOpen = input<boolean>();
  onClose = output();
  onSelect = output<string>();

  selectedOption = signal('');
  selectOption(option: string) {
    this.selectedOption.set(option);
  }
}
