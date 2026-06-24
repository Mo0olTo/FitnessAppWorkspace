import { Component, input, output } from '@angular/core';

export interface VideoPreviewPayload {
  url: string;
  exercise: any;
}

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
  exercise = input<any>(null);
  cardSelected = output<any>();
  videoUrl = input<string>('');
  active = input<boolean>(false);
  videoPreview = output<VideoPreviewPayload>();
  playBtn = output<any>();
  showPlayButton = input(true);

  onPreview(url: string): void {
    this.videoPreview.emit({ url, exercise: this.exercise() });
  }

  onPlayButton(action: any): void {
    this.playBtn.emit(action);
  }

  // last thing i did i changed on preview and added video url to the list card
}
