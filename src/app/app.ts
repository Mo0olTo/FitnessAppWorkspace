import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FormTitle } from "./features/auth/components/form-title/form-title";
import { Knob } from "./features/auth/components/knob/knob";
import { FormButton } from "./features/auth/components/form-button/form-button";
import { SectionTitle } from "./shared/components/section-title/section-title";
import { ThemeFacade } from './core/Theme/theme.facade';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormTitle, Knob, FormButton, SectionTitle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
 progress=6
 isDisabled=true 

 private readonly themefacede=inject(ThemeFacade)




  toggle(){
   this.themefacede.toggleTheme()
  }
}
