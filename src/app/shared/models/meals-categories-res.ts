export interface MealCategoryRES {
  meals: Meal[];
}

export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea: null | string;
  strCountry: string;
}