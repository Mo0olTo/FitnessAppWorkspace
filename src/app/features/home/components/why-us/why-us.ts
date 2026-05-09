import { Component, input, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';

@Component({
  selector: 'app-why-us',
  imports: [SectionTitle],
  templateUrl: './why-us.html',
  styleUrl: './why-us.scss',
})
export class WhyUs {
  images = input<string[]>([
    '/images/1whyus.webp',
    '/images/2whyus.webp',
    '/images/3whyus.webp',
    '/images/4whyus.webp',
  ]);

  imageHeights = signal<number[]>([378, 344, 285, 346]);
}
