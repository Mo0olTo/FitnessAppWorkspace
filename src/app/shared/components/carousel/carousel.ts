import { Component, HostListener, OnInit, computed, inject, input, output, signal } from '@angular/core';
import { Carousel } from 'primeng/carousel';


@Component({
  selector: 'app-carousel',
  imports: [ Carousel, ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class ReuseableCarousel implements OnInit{
  

  // this variable for calling it in each component
  carouselData=input<any[]>([])
  // the 
  cardImage=input<string>('')
  cardTitle=input<string>('')
  cardAction=output<any>()
  responsiveOptions: any[] | undefined; 

  screenWidth = signal(window.innerWidth); 

  ngOnInit() {
   

    this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}


  onCardClick(path:string) {
    this.cardAction.emit(path); 
  }
  
 

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  } 


  cardsPerSlide = computed(() => {
    const width = this.screenWidth();
  
    if (width < 768) {
      return 2; // Mobile (1 × 2)
    }
  
    if (width < 1024) {
      return 4; // Tablet (2 × 2)
    }
  
    return 6; // Desktop (3 × 2)
  });



  groupedData = computed(() => {
    const data = this.carouselData();
    const size = this.cardsPerSlide();
  
    const result = [];
  
    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size));
    }
  
    return result;
  });




}
