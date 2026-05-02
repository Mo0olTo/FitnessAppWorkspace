import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-horizontal',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
  templateUrl: './horizontal.html',
  styleUrl: './horizontal.scss',
})
export class Horizontal {
  data = input.required<number[]>();
  initialIndex = input<number>(0);
  valueChange = output<number>();

  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;
  activeIndex = signal(0);

  constructor() {
    effect(() => {
      const startAt = this.initialIndex();
      const swiperEl = this.swiperRef?.nativeElement;

      if (swiperEl) {
        setTimeout(() => {
          swiperEl.swiper.slideTo(startAt, 0);
          this.activeIndex.set(startAt);
        }, 50);
      }
    });
  }

  ngAfterViewInit() {
    this.swiperRef.nativeElement.addEventListener('swiperslidechange', (event: any) => {
      const index = event.detail[0].activeIndex;
      this.activeIndex.set(index);
      this.valueChange.emit(this.data()[index]);
    });
  }
}
