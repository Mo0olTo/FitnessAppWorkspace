import { Component } from '@angular/core';
import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [CustomButton, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
