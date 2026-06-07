import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-reusable-card',
  imports: [],
  templateUrl: './reusable-card.html',
  styleUrl: './reusable-card.scss',
})
export class ReusableCard {
  image = input.required<string>();
  title = input.required<string>();
  actionText = input.required<string>();
  cardClick = output<void>();

  onBtnClick() {
    this.cardClick.emit();
  }
}
