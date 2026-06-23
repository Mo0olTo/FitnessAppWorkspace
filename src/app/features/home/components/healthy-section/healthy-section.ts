import { MealsFacade } from './../../../../store/meals/meals.facade';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { FilterTabs } from "../../../../shared/components/filter-tabs/filter-tabs";
import { ReuseableCarousel } from "../../../../shared/components/carousel/carousel";
import { FILTER_TABS } from '../../../../shared/components/filter-tabs/filter-tabs-config/filter-tabs-config';
import { Category } from '../../../../shared/models/meals-res';
import { FilterTab } from '../../../../shared/components/filter-tabs/models/filter-tabs.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-healthy-section',
  imports: [SectionTitle, FilterTabs, ReuseableCarousel],
  templateUrl: './healthy-section.html',
  styleUrl: './healthy-section.scss',

})
export class HealthySection implements OnInit {

  private readonly MealsFacade=inject(MealsFacade)
  private readonly router = inject(Router);

  mealsCats=this.MealsFacade.MealsCat
  mealsByCategory=this.MealsFacade.MealsByCategory
  Loading=this.MealsFacade.isLoading
  error=this.MealsFacade.error

  selectedCategoryTab = signal<string>('');

  carouselMeals = computed(() =>
    this.mealsCats().map(c => ({
      _id: c.idCategory,
      name: c.strCategory,
      image: c.strCategoryThumb,
      description: c.strCategoryDescription,
    }))
  );

  mealCategoryTabs = computed<FilterTab[]>(() =>
    this.mealsCats().map(c => ({
      id: c.strCategory,
      label: c.strCategory,
    }))
  );

  mealsCarousel = computed(() =>
    this.mealsByCategory().map(m => ({
      _id: m.idMeal,
      name: m.strMeal,
      image: m.strMealThumb,
    }))
  );


  ngOnInit(): void {
      this.MealsFacade.loadMealsCategories();
  }

  onCategoryTabChange(tab: FilterTab): void {
    this.selectedCategoryTab.set(tab.id);
    this.MealsFacade.loadMealsbyCategory(tab.id);
  }
 

  onNavigation():void{
    this.router.navigate([`/healthy`])
    
  }

}
