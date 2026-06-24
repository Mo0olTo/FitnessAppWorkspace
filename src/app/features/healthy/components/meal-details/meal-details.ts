import { Component, computed, input, output } from '@angular/core';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { MealInfo } from '../../../../shared/models/meal-details-res';
import { ListCard } from "../../../../shared/components/listCard/list-card/list-card";

@Component({
  selector: 'app-meal-details',
  imports: [SectionTitle, ListCard],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.scss',
})
export class MealDetails {

  meal = input<MealInfo | null>(null);
  mealList = input<{ _id: string; name: string; image: string }[]>([]);

  onAction = output<void>();
  mealSelected = output<string>();

  ingredients = computed(() => {
    const m = this.meal();
    if (!m) return [];
    const result: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const name = (m as any)[`strIngredient${i}`];
      const measure = (m as any)[`strMeasure${i}`];
      if (name && String(name).trim()) {
        result.push({ name: String(name), measure: measure ? String(measure) : '' });
      }
    }
    return result;
  });

  tags = computed(() => {
    const t = this.meal()?.strTags;
    if (!t) return [];
    return String(t).split(',').map(s => s.trim()).filter(Boolean);
  });

  onActionClick(): void {
    this.onAction.emit();
  }

  onMealListClick(mealId: string): void {
    this.mealSelected.emit(mealId);
  }
}
