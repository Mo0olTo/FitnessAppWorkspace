import { ToastModule } from 'primeng/toast';
import { Component, inject} from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ThemeFacade } from './core/Theme/theme.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',

})
export class App {
  
  private readonly themefacede=inject(ThemeFacade)

    toggle(){
    this.themefacede.toggleTheme()
    }
}
