import { inject, Injectable } from '@angular/core';
import { ExerciseStore } from './exercise.store';

@Injectable({ providedIn: 'root' })
export class ExercisesFacade {

  private readonly store = inject(ExerciseStore);

  // STATE
  exercises = this.store.exercises;
  isLoading = this.store.isLoading;
  error = this.store.error;

  selectedMuscleId = this.store.selectedMuscleId;
  selectedDifficultyId = this.store.selectedDifficultyId;

  // ACTIONS
  setMuscle(id: string) {
    this.store.setMuscle(id);
  }

  setDifficulty(id: string) {
    this.store.setDifficulty(id);
  }

  reset() {
    this.store.reset();
  } 
}