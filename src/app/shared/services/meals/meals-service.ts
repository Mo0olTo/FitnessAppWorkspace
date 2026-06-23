import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsRES } from '../../models/meals-res';
import { MealCategoryRES } from '../../models/meals-categories-res';
import { environment } from '../../../../environments/environment';
import { MealDetailsRES } from '../../models/meal-details-res';

@Injectable({
  providedIn: 'root',
})
export class MealsService { 

  private readonly http=inject(HttpClient)


  getMealsCategories():Observable<MealsRES>{
    return this.http.get<MealsRES>(`${environment.mealsUrl}categories.php`)
  }
  
  getMealsbyCategory(mealId:string):Observable<MealCategoryRES>{
    return this.http.get<MealCategoryRES>(`${environment.mealsUrl}filter.php`,{
      params:{
        c:mealId
      }
    })
  } 

  getMealDetails(mealId:string):Observable<MealDetailsRES>{
    return this.http.get<MealDetailsRES>(`${environment.mealsUrl}lookup.php`,{
      params:{
        i:mealId
      }
    })
  }
  
}
