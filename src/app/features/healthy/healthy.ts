import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, EnvironmentInjector, inject, OnInit, runInInjectionContext, signal } from '@angular/core';
import { MealsFacade } from '../../store/meals/meals.facade';
import { SectionTitle } from "../../shared/components/section-title/section-title";
import { FilterTab } from '../../shared/components/filter-tabs/models/filter-tabs.model';
import { FilterTabs } from '../../shared/components/filter-tabs/filter-tabs';
import { ReuseableCarousel } from "../../shared/components/carousel/carousel";
import { MealDetails } from "./components/meal-details/meal-details";

@Component({
  selector: 'app-healthy',
  imports: [SectionTitle, FilterTabs, ReuseableCarousel, MealDetails],
  templateUrl: './healthy.html',
  styleUrl: './healthy.scss',
})
export class Healthy implements OnInit {
  private readonly MealsFacade=inject(MealsFacade)
  private readonly injector = inject(EnvironmentInjector);

  mealsCats=this.MealsFacade.MealsCat
  mealsByCategory=this.MealsFacade.MealsByCategory
  mealDetails=this.MealsFacade.MealsDetails
  Loading=this.MealsFacade.isLoading
  error=this.MealsFacade.error

  step = signal<number>(1);
  selectedCategoryTab = signal<string>('Beef');

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
      this.autoLoadBeef();
  }

  autoLoadBeef(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const cats = this.mealsCats();
        if (cats.length && !this.mealsByCategory().length) {
          const beef = cats.find(c => c.strCategory.toLowerCase() === 'beef');
          if (beef) {
            this.selectedCategoryTab.set(beef.strCategory);
            this.MealsFacade.loadMealsbyCategory(beef.strCategory);
          }
        }
      });
    });
  }

  onCategoryTabChange(tab: FilterTab): void {
    this.selectedCategoryTab.set(tab.id);
    this.MealsFacade.loadMealsbyCategory(tab.id);
  }

  onMealCardClick(mealId: string): void {
    this.MealsFacade.loadMealDetails(mealId);
    this.step.set(2);
  }

  onMealFromList(mealId: string): void {
    this.MealsFacade.loadMealDetails(mealId);
  }

  backToMeals(): void {
    this.step.set(1);
  }

}
