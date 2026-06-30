import { inject, Injectable, signal } from '@angular/core';
import { GeminiService } from '../../../shared/services/geminiService/gemini-service';
import { ChatMessage } from '../../../shared/models/chat-message';
import { AuthFacade } from '../../auth/auth-facade/auth-facade';



@Injectable({
  providedIn: 'root',
})
export class AiAssistantFacade {
  private readonly gemini = inject(GeminiService);
  private readonly authFacade = inject(AuthFacade);

  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  open = signal(false);
  welcomeMessageShown = signal(false);
  firstName=this.authFacade.firstName

  toggle(): void {
    this.open.update(open => {
      const next = !open;
  
      if (next) {
        this.showWelcomeMessage();
      }
  
      return next;
    });
  }

  close(): void {
    this.open.set(false);
  } 


  async showWelcomeMessage(): Promise<void> {
    if (this.welcomeMessageShown()) {
      return;
    }
  
    const welcomeMessage: ChatMessage = {
      id: this.makeId(),
      role: 'assistant',
      text: `👋 Hello ${this.firstName()} I'm your Smart Coach.    
               How can I help you today?`,
      pending: false,
    };
  
    this.messages.update(messages => [...messages, welcomeMessage]);
    this.welcomeMessageShown.set(true);
  }

  async sendMessage(text: string): Promise<void> {
    const trimmed = (text ?? '').trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: this.makeId(),
      role: 'user',
      text: trimmed,
      pending: false,
    };
    const pendingAssistant: ChatMessage = {
      id: this.makeId(),
      role: 'assistant',
      text: '',
      pending: true,
    };

    this.messages.update((current) => [...current, userMessage, pendingAssistant]);
    this.loading.set(true);
    this.error.set(null);

    try {
      const reply = await this.gemini.chat(trimmed);
      const replyText = (reply ?? '').toString().trim();
      await this.typeMessage(pendingAssistant.id, replyText);
      this.replaceMessage(pendingAssistant.id, {
        ...pendingAssistant,
        text: replyText || '(empty response)',
        pending: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      this.error.set(message);
      this.replaceMessage(pendingAssistant.id, {
        ...pendingAssistant,
        text: "Sorry, I couldn't reach the AI service. Please try again.",
        pending: false,
      });
    } finally {
      this.loading.set(false);
    }
  }  

  
  private async typeMessage(id: string, text: string): Promise<void> {
    let current = '';
  
    for (const char of text) {
      current += char;
  
      this.replaceMessage(id, {
        id,
        role: 'assistant',
        text: current,
        pending: false,
      });
  
      await new Promise(resolve => setTimeout(resolve, 15));
    }
  }

  clear(): void {
    this.messages.set([]);
    this.error.set(null);
    this.welcomeMessageShown.set(false);
  }

  private replaceMessage(id: string, replacement: ChatMessage): void {
    this.messages.update((current) =>
      current.map((msg) => (msg.id === id ? replacement : msg)),
    );
  }

  private makeId(): string {
    return `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }
}