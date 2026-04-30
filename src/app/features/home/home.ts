import { Component } from '@angular/core';
import { ServicesBar } from './components/ServicesBar/services-bar/services-bar';
import { Hero } from './components/Hero/hero/hero';
import { WhyUs } from './components/why-us/why-us';
import { AboutSection } from './components/about-section/about-section';
@Component({
  selector: 'app-home',
  imports: [Hero, ServicesBar, AboutSection, WhyUs],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
