import { inject, Injectable } from '@angular/core';
import { MusclesStore } from './muscles.store';

@Injectable({
  providedIn: 'root',
})
export class MuscleFacade {
  private store = inject(MusclesStore);

  allMuscles = this.store.musclesData;
  muscleGroup = this.store.muscleGroup;
  isloading = this.store.isloading;
  error = this.store.error;

  loadAllMuscles(): void {
    this.store.loadAllMuscles();
  }

  loadMusclesbyId(id: string): void {
    this.store.loadMuscleGroupById(id);
  }

  clearMuscleGroup(): void {
    this.store.clearMuscleGroup();
  }
}
