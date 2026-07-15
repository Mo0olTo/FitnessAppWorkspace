import { Component, HostListener, OnInit, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, Carousel],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class ReuseableCarousel implements OnInit {
  carouselData = input<any[]>([]);
  cardAction = output<any>();


  rows = input<number>(1);
  minimizeCard=input<boolean>(false)
  // optional: force a fixed number of columns per row instead of responsive
  cols = input<number | null>(null);

  responsiveOptions: any[] | undefined;
  screenWidth = signal(window.innerWidth);

  ngOnInit() {
    const multiRow = this.rows() > 1;
    this.responsiveOptions = [
      { breakpoint: '1400px', numVisible: multiRow ? 1 : 2, numScroll: 1 },
      { breakpoint: '1199px', numVisible: multiRow ? 1 : 3, numScroll: 1 },
      { breakpoint: '767px', numVisible: 1, numScroll: 1 },
      { breakpoint: '575px', numVisible: 1, numScroll: 1 },
    ];
  }

  onCardClick(path: string) {
    this.cardAction.emit(path);
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  // columns per row, responsive unless `cols` is explicitly set
  cardsPerRow = computed(() => {
    if (this.cols()) return this.cols()!;
    const width = this.screenWidth();
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  });

  // chunks items into groups of (rows * cardsPerRow) — only relevant when rows > 1
  groupedData = computed(() => {
    const data = this.carouselData();
    if (this.rows() <= 1) return [];
    const size = this.rows() * this.cardsPerRow();
    const result: any[][] = [];
    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size));
    }
    return result;
  });

  // what actually gets passed into p-carousel's [value]
  displayData = computed(() => (this.rows() > 1 ? this.groupedData() : this.carouselData()));
  
  numVisible = computed(() => (this.rows() > 1 ? 1 : 3));
  numScroll = computed(() => (this.rows() > 1 ? 1 : 3));
}