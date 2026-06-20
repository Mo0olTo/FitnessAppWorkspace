import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseRES } from '../../models/exercise-res';
import { environment } from '../../../../environments/environment';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService { 

  private readonly http=inject(HttpClient)


  getExerciseByMuscleAndDiff(muscleID:string , diffcultyID:string):Observable<ExerciseRES>{

    return this.http.get<ExerciseRES>(`${environment.apiBaseUrl}${API_ENDPOINTS.exercise.muscleDifficulty}`,
      {
        params: {
          primeMoverMuscleId: muscleID,
          difficultyLevelId: diffcultyID
        }
      }
    )
  }
  
}
