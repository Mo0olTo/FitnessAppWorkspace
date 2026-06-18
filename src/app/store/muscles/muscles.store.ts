import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Muscles } from '../../shared/services/muscles/muscles';
import { MusclesGroup, MusclesRes } from '../../shared/models/musclesRes';
import { finalize} from 'rxjs';
import { Muscle, MuscleGroupRes } from '../../shared/models/muscle-group-res';

@Injectable({
  providedIn: 'root',
})
export class MusclesStore {
  
  private readonly muscles=inject(Muscles)
  


  musclesData=signal<MusclesGroup[]>([])
  muscleGroup=signal<Muscle[]>([])
  muscleGroupCache = new Map<string, Muscle[]>();
  isloading=signal<boolean>(false)
  error=signal<string|null>(null)

  loadAllMuscles():void{

    if (this.musclesData().length > 0) return;
    this.isloading.set(true)
    this.error.set(null)

    this.muscles.getMuscles().pipe(
      finalize(() => this.isloading.set(false)),
    ).subscribe({
      next: (res: MusclesRes) => {
        this.musclesData.set(res.musclesGroup);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.message ?? err.message ?? 'Failed to load muscles');
      },
    });

  }


  loadMuscleGroupById(id:string):void{
    const cached = this.muscleGroupCache.get(id);
    if (cached) {
      this.muscleGroup.set(cached);
      return;
    }

    this.isloading.set(true)
    this.error.set(null)
    this.muscles.getGroupMuscles(id).pipe(
      finalize(() => this.isloading.set(false)),
    ).subscribe({
      next: (res: MuscleGroupRes) => {
        this.muscleGroupCache.set(id, res.muscles);
        this.muscleGroup.set(res.muscles);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.message ?? err.message ?? 'Failed to load muscle group');
      },
    });
  } 


  clearMuscleGroup(): void {
    this.muscleGroup.set([]);
  }
 
}
