import { Component, inject, signal} from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ThemeFacade } from './core/Theme/theme.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',

})
export class App {
  
  private readonly themefacede=inject(ThemeFacade)
  isDark = signal(true);


    toggle(){
      this.isDark.update(v => !v);
      this.themefacede.toggleTheme()
    }
}
