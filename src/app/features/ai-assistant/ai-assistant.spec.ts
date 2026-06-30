import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { signal } from '@angular/core';

import { AiAssistant } from './ai-assistant';
import { AiAssistantFacade, ChatMessage } from './ai-assistant-facade/ai-assistant-facade';

class AiAssistantFacadeStub {
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  open = signal(false);
  sendMessage = jasmine.createSpy('sendMessage').and.callFake(async (text: string) => {
    this.messages.update((current) => [
      ...current,
      { id: `u_${current.length}`, role: 'user', text, pending: false },
      { id: `a_${current.length}`, role: 'assistant', text: 'reply', pending: false },
    ]);
  });
  toggle = jasmine.createSpy('toggle').and.callFake(() => {
    this.open.update((v) => !v);
  });
  close = jasmine.createSpy('close').and.callFake(() => {
    this.open.set(false);
  });
  clear = jasmine.createSpy('clear');
}

describe('AiAssistant', () => {
  let component: AiAssistant;
  let fixture: ComponentFixture<AiAssistant>;
  let facadeStub: AiAssistantFacadeStub;

  beforeEach(async () => {
    facadeStub = new AiAssistantFacadeStub();

    await TestBed.configureTestingModule({
      imports: [AiAssistant],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AiAssistantFacade, useValue: facadeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AiAssistant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose facade state to the template', () => {
    expect(facadeStub.messages()).toEqual([]);
    expect(facadeStub.loading()).toBeFalse();
    expect(facadeStub.error()).toBeNull();
    expect(facadeStub.open()).toBeFalse();

    // When closed, the chat section is not rendered.
    const closedSection = fixture.nativeElement.querySelector('.ai-chat');
    expect(closedSection).toBeNull();

    // Open the chat and verify the template reacts.
    facadeStub.open.set(true);
    fixture.detectChanges();

    const errorBanner = fixture.nativeElement.querySelector('[data-testid="ai-error"]');
    expect(errorBanner).toBeNull();

    const messagesContainer = fixture.nativeElement.querySelector(
      '[data-testid="ai-messages"]',
    );
    expect(messagesContainer).toBeTruthy();
    expect(messagesContainer.querySelectorAll('.ai-chat__row').length).toBe(0);
  });

  it('should update the draft signal when the input changes', () => {
    facadeStub.open.set(true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="ai-input"]',
    );

    input.value = 'Hello coach';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component['draft']()).toBe('Hello coach');
  });

  it('should disable the send button when the draft is empty or whitespace', () => {
    facadeStub.open.set(true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="ai-send"]',
    );

    expect(button.disabled).toBeTrue();

    component['draft'].set('   ');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();

    component['draft'].set('Hi');
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });

  it('should disable the send button while loading', () => {
    facadeStub.open.set(true);
    fixture.detectChanges();

    component['draft'].set('Hi');
    facadeStub.loading.set(true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="ai-send"]',
    );
    expect(button.disabled).toBeTrue();
  });

  it('should send trimmed text via the facade and clear the draft on send', async () => {
    component['draft'].set('  Hello coach  ');
    await component['send']();

    expect(facadeStub.sendMessage).toHaveBeenCalledOnceWith('Hello coach');
    expect(component['draft']()).toBe('');
  });

  it('should not call the facade when send is invoked with an empty draft', async () => {
    component['draft'].set('   ');
    await component['send']();

    expect(facadeStub.sendMessage).not.toHaveBeenCalled();
  });

  it('should show the error banner when facade exposes an error', () => {
    facadeStub.open.set(true);
    facadeStub.error.set('AI service unavailable');
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('[data-testid="ai-error"]');
    expect(banner).toBeTruthy();
    expect(banner.textContent).toContain('AI service unavailable');
  });

  it('should render pending assistant messages with the typing indicator', () => {
    facadeStub.open.set(true);
    facadeStub.messages.set([
      { id: 'p', role: 'assistant', text: '', pending: true },
    ]);
    fixture.detectChanges();

    const typing = fixture.nativeElement.querySelector('.ai-chat__typing');
    expect(typing).toBeTruthy();
  });

  it('should render user and assistant bubbles with the correct roles', () => {
    facadeStub.open.set(true);
    facadeStub.messages.set([
      { id: 'u', role: 'user', text: 'Hi', pending: false },
      { id: 'a', role: 'assistant', text: 'Hello!', pending: false },
    ]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.ai-chat__row');
    expect(rows.length).toBe(2);
    expect(rows[0].getAttribute('data-role')).toBe('user');
    expect(rows[1].getAttribute('data-role')).toBe('assistant');
    expect(rows[0].textContent).toContain('Hi');
    expect(rows[1].textContent).toContain('Hello!');
  });

  describe('open / close', () => {
    it('should delegate toggle() to the facade', () => {
      component['toggle']();
      expect(facadeStub.toggle).toHaveBeenCalled();
    });

    it('should delegate close() to the facade', () => {
      component['close']();
      expect(facadeStub.close).toHaveBeenCalled();
    });

    it('should not render the chat section when closed', () => {
      facadeStub.open.set(false);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.ai-chat')).toBeNull();
    });

    it('should render the chat section when open', () => {
      facadeStub.open.set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.ai-chat')).toBeTruthy();
    });

    it('should call close() when the close button is clicked', () => {
      facadeStub.open.set(true);
      facadeStub.close.calls.reset();
      fixture.detectChanges();

      const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector(
        '[data-testid="ai-close"]',
      );
      expect(closeButton).toBeTruthy();
      closeButton.click();

      expect(facadeStub.close).toHaveBeenCalled();
    });
  });
});