import { Component } from '@angular/core';
import { ServicesBar } from './components/ServicesBar/services-bar/services-bar';
import { Hero } from './components/Hero/hero/hero';

@Component({
  imports: [Hero, ServicesBar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
