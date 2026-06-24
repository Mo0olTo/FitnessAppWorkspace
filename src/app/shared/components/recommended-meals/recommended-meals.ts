import { Component, inject, OnInit, signal } from '@angular/core';
import { ReuseableCarousel } from "../carousel/carousel";
import { Router } from '@angular/router';
import { ReocmmMeals } from '../../models/recomm-meals';

@Component({
  selector: 'app-recommended-meals',
  imports: [ReuseableCarousel],
  templateUrl: './recommended-meals.html',
  styleUrl: './recommended-meals.scss',
})
export class RecommendedMeals implements OnInit {

  private readonly router = inject(Router);

  mealRecommended=signal<ReocmmMeals[]>([])
  

  ngOnInit(): void {
    this.loadMeals()
  }  

  loadMeals():void{
    this.mealRecommended.set([
      {image:'/images/meals/meal1.webp',
        name:'BreakFast'
      },
      {image:'/images/meals/meal2.webp',
        name:'Lunch'
      },
      {image:'/images/meals/meal3.webp',
        name:'Dinner'
      },
    ])
  }

  onNavigation():void{
    this.router.navigate([`/healthy`])
    
  }
}
