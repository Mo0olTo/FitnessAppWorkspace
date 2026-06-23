import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-list-card',
  imports: [],
  templateUrl: './list-card.html',
  styleUrl: './list-card.scss',
})
export class ListCard {
  image = input<string>('');
  alt = input<string>();
  title = input<string>('');
  metaData = input<string>('');

  videoUrl = input<string>('');
  videoPreview = output<string>();

  onPreview(): void {
    this.videoPreview.emit(this.videoUrl());
  }
}
