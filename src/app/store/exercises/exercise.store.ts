import { effect, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { ExercisesService } from '../../shared/services/exercises/exercises-service';
import { Exercise, ExerciseRES } from '../../shared/models/exercise-res';

@Injectable({ providedIn: 'root' })
export class ExerciseStore {

  private readonly api = inject(ExercisesService);

  // =====================
  // STATE
  // =====================
  isLoading = signal(false);
  error = signal<string | null>(null);
  exercises = signal<Exercise[]>([]);

  selectedMuscleId = signal<string | null>(null);
  selectedDifficultyId = signal<string | null>(null);

  // prevent duplicate calls
  private lastKey = signal<string | null>(null);

  constructor() {
    this.initEffect();
  }

  // =====================
  // REACTIVE ENGINE
  // =====================
  private initEffect() {
    effect(() => {

      const muscle = this.selectedMuscleId();
      const diff = this.selectedDifficultyId();

      if (!muscle || !diff) return;
     
      const key = `${muscle}-${diff}`;

      if (this.lastKey() === key) return;

      this.loadExercises(muscle, diff, key);
    });
  }

  // =====================
  // ACTIONS
  // =====================
  setMuscle(id: string) {
    this.selectedMuscleId.set(id);
  }

  setDifficulty(id: string) {
    this.selectedDifficultyId.set(id);
  }

  reset() {
    this.selectedMuscleId.set(null);
    this.selectedDifficultyId.set(null);
    this.exercises.set([]);
    this.lastKey.set(null);
  }

  // =====================
  // API
  // =====================
  private loadExercises(muscle: string, diff: string, key: string) {

    this.isLoading.set(true);
    this.error.set(null);
    this.exercises.set([]);

    this.api.getExerciseByMuscleAndDiff(muscle, diff)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res: ExerciseRES) => {
          console.log(res);
          this.exercises.set(res.exercises);
          this.lastKey.set(key);
        },
        error: (err) => {
          this.error.set(err.message);
        }
      });
  }
}