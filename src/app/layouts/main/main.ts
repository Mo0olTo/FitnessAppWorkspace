import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';
import { ServicesBar } from "../../features/home/components/ServicesBar/services-bar/services-bar";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Nav, Footer, ServicesBar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
