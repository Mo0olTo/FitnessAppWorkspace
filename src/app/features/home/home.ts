import { Component } from '@angular/core';
import { AboutSection } from "./components/about-section/about-section";

@Component({
  selector: 'app-home',
  imports: [AboutSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
