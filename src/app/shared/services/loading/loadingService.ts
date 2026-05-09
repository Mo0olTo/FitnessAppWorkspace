import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  loading = signal<boolean>(false);

  startLoading():void{
    this.loading.set(true);
  }

  stopLoading():void{
    this.loading.set(false);
  }
  
}
