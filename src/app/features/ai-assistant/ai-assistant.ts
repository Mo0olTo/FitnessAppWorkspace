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

  protected readonly draft = signal('');
  protected readonly messages = this.facade.messages;
  protected readonly loading = this.facade.loading;
  protected readonly error = this.facade.error;
  protected readonly open = this.facade.open; 
  protected readonly userPhoto = this.authFacade.userPhoto; 


  protected readonly canSend = computed(
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

  protected onDraftInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.draft.set(value);
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    void this.send();
  }

  protected async send(): Promise<void> {
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

  protected toggle(): void {
    this.facade.toggle();
  }

  protected close(): void {
    this.facade.close();
  }

} 