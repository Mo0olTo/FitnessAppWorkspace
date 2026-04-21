import { Component } from '@angular/core';
import { WhyUs } from "./components/why-us/why-us";

@Component({
  selector: 'app-home',
  imports: [WhyUs],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
