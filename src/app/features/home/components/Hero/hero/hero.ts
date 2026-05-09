import { Component } from '@angular/core';
import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';

@Component({
  selector: 'app-hero',
  imports: [CustomButton],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
