import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
