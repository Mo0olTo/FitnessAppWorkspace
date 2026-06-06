import { Component } from '@angular/core';
import { ReusableCard } from '../../shared/components/reusable-card/reusable-card';

@Component({
  selector: 'app-about',
  imports: [ReusableCard],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
