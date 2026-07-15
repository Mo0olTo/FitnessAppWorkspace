import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MusclesRes } from '../../models/musclesRes';
import { MuscleGroupRes } from '../../models/muscle-group-res';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class Muscles {

  private readonly http=inject(HttpClient)

  getMuscles():Observable<MusclesRes>{
    return this.http.get<MusclesRes>(`${environment.apiBaseUrl}${API_ENDPOINTS.muscles.muscles}`)
  }

  getGroupMuscles(id:string):Observable<MuscleGroupRes>{
    return this.http.get<MuscleGroupRes>(`${environment.apiBaseUrl}${API_ENDPOINTS.muscles.musclesGroup}/${id}`)
  }
  
}
