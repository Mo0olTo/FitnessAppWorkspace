import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
