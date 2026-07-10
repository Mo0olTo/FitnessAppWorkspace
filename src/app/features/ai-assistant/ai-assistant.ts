import { afterNextRender, Component,computed,ElementRef,inject, signal, viewChild,} from '@angular/core';
import { AiAssistantFacade } from './ai-assistant-facade/ai-assistant-facade';
import { AuthFacade } from '../auth/auth-facade/auth-facade';

@Component({
  selector: 'app-ai-assistant',
  imports: [],
  templateUrl: './ai-assistant.html',
  styleUrl: './ai-assistant.scss',
})
export class AiAssistant {
  private readonly facade = inject(AiAssistantFacade);
  private readonly authFacade = inject(AuthFacade);

   readonly draft = signal('');
   readonly messages = this.facade.messages;
   readonly loading = this.facade.loading;
   readonly error = this.facade.error;
   readonly open = this.facade.open; 
   readonly userPhoto = this.authFacade.userPhoto; 


   readonly canSend = computed(
    () => !this.facade.loading() && this.draft().trim().length > 0,
  );

  private readonly scrollAnchor =
    viewChild<ElementRef<HTMLDivElement>>('scrollAnchor');

  constructor() {
    // afterNextRender only runs in the browser, so it is safe to touch the DOM here.
    // We re-scroll on every messages update without using effect().
    afterNextRender(() => {
      this.scrollToBottom();
    });
  }

  onDraftInput(event: Event): void {
    const element = event.target as HTMLInputElement | HTMLTextAreaElement;
  
    this.draft.set(element.value);
  
    if (element instanceof HTMLTextAreaElement) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  }

   onEnter(event: Event): void {
    event.preventDefault();
    void this.send();
  }

   async send(): Promise<void> {
    if (this.loading()) return;
    const text = this.draft().trim();
    if (!text) return;
    this.draft.set('');
    await this.facade.sendMessage(text);
    const input = document.querySelector('[data-testid="ai-input"]') as HTMLInputElement;
          input?.focus();
    this.scrollToBottom();
    
  } 



  scrollToBottom(): void {
    const anchor = this.scrollAnchor()?.nativeElement;
    anchor?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

   toggle(): void {
    this.facade.toggle();
  }

   close(): void {
    this.facade.close();
  } 



} 