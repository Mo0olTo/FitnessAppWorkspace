import { Component } from '@angular/core';
import { Hero } from './components/Hero/hero/hero';
import { ServicesBar } from './components/ServicesBar/services-bar/services-bar';

@Component({
  selector: 'app-home',
  imports: [Hero, ServicesBar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
