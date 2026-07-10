import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiContextService {
  private readonly http = inject(HttpClient);

  load() {
    return firstValueFrom(
      this.http.get('/ai-context.json')
    );
  }
}
