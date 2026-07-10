import { inject, Injectable, signal } from "@angular/core";
import { MealsService } from "../../shared/services/meals/meals-service";
import { Category, MealsRES } from "../../shared/models/meals-res";
import { Meal, MealCategoryRES } from "../../shared/models/meals-categories-res";
import { finalize } from "rxjs";
import { MealDetails } from "../../features/healthy/components/meal-details/meal-details";
import { MealDetailsRES, MealInfo } from "../../shared/models/meal-details-res";


@Injectable({ providedIn: 'root' })
export class MealsStore {

    private readonly api = inject(MealsService);

    isLoading = signal(false);
    error = signal<string | null>(null);
    MealsCategories=signal<Category[]>([])

    MealsByCategory=signal<Meal[]>([])
    mealDtails=signal<MealInfo[]>([])


    loadMealsCategories():void{
        this.isLoading.set(true);
        this.error.set(null);

        this.api.getMealsCategories().pipe(finalize(()=>this.isLoading.set(false)))
        .subscribe({
            next:(res:MealsRES)=>{
                this.MealsCategories.set(res.categories)
            },error:()=>{
                this.error.set('ERROR')
            }
        })
    }

    loadMealsbyCategory(mealId: string): void {
        this.isLoading.set(true);
        this.error.set(null);

        this.api.getMealsbyCategory(mealId).pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
            next: (res: MealCategoryRES) => {
                this.MealsByCategory.set(res.meals ?? []);
            },
            error: () => {
                this.error.set('ERROR');
            }
        });
    } 


    loadMealDetails(mealID:string):void{
        this.isLoading.set(true)
        this.error.set(null)

        this.api.getMealDetails(mealID).pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
            next:(res:MealDetailsRES)=>{
                this.mealDtails.set(res.meals ?? [])
            },error: () => {
                this.error.set('ERROR');
            }
        })
    }

}