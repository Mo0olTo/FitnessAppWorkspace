import { Component, computed, input, Input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services-bar',
  imports: [TranslatePipe],
  templateUrl: './services-bar.html',
  styleUrl: './services-bar.scss',
})
export class ServicesBar {
  items = signal<string[]>([
    'services.outdoor',
    'services.personal_training',
    'services.live_classes',
    'services.personal_trainers',
  ]);

  duplicatedItems = computed(() => {
    const data = this.items();
    return [...data, ...data, ...data];
  });
}
