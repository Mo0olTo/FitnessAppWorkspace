import { Component, input, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { ReuseableCarousel } from "../../../../shared/components/carousel/carousel";


@Component({
  selector: 'app-why-us',
  imports: [SectionTitle, ReuseableCarousel],
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

  btnCheck():void{
    window.alert('Hello From Preview ')
    
  }
}
