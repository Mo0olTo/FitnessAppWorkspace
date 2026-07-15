import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';
import { Footer } from './components/footer/footer';
import { ServicesBar } from "../../features/home/components/ServicesBar/services-bar/services-bar";
import { AiAssistant } from "../../features/ai-assistant/ai-assistant";
import { AiAssistantFacade } from "../../features/ai-assistant/ai-assistant-facade/ai-assistant-facade";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Nav, Footer, ServicesBar, AiAssistant],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private readonly aiFacade = inject(AiAssistantFacade);

  message = {
    open: 'Hey Ask Me',
    close: 'Tap to Close',
  }; 

  isOpen=this.aiFacade.open

  protected toggleAssistant(): void {
    this.aiFacade.toggle();
  }
}
