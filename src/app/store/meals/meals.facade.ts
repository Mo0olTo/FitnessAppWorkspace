import { inject, Injectable } from "@angular/core";
import { MealsStore } from "./meals.store";

@Injectable({ providedIn: 'root' })
export class MealsFacade {

    private readonly store=inject(MealsStore)

    // STATE
    MealsCat=this.store.MealsCategories
    MealsByCategory=this.store.MealsByCategory
    MealsDetails=this.store.mealDtails
    isLoading=this.store.isLoading
    error=this.store.error

    // ACTIONS
    // all Categories
    loadMealsCategories(): void {
        this.store.loadMealsCategories();
    }
    // Meals By Category
    loadMealsbyCategory(mealId: string): void {
        this.store.loadMealsbyCategory(mealId);
    }
    // each Meal Details
    loadMealDetails(mealID:string):void{
        this.store.loadMealDetails(mealID)
    }

}