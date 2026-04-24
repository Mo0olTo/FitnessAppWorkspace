import { Component, computed, input, Input, signal } from '@angular/core';

@Component({
  selector: 'app-services-bar',
  imports: [],
  templateUrl: './services-bar.html',
  styleUrl: './services-bar.scss',
})
export class ServicesBar {
  items = signal<string[]>([
    'Outdoor & Online Trainers',
    'Personal Training',
    'Live Classes',
    'Personal Trainers',
  ]);

  duplicatedItems = computed(() => {
    const data = this.items();
    return [...data, ...data, ...data];
  });
}
