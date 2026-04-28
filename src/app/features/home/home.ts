import { Component } from '@angular/core';
import { WhyUs } from "./components/why-us/why-us";
import { AboutSection } from "./components/about-section/about-section";

@Component({
  imports: [AboutSection, WhyUs],

  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
