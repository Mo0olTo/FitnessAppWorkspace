import { Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loadingService';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  readonly loading=inject(LoadingService)
}
