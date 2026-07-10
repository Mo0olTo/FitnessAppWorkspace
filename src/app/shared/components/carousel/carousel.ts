import { Component, OnInit, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Carousel } from 'primeng/carousel';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-carousel',
  imports: [Carousel, TranslatePipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class ReuseableCarousel implements OnInit {
  // this is mock for previewing the carousel
  products = signal<Product[]>([]);
  // this variable for calling it in each component
  carouselData = input<any[]>([]);
  // the
  cardImage = input<string>('');
  cardTitle = input<string>('');
  cardAction = output<any>();
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
