import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { AiAssistantFacade } from './ai-assistant-facade';
import { GeminiService } from '../../../shared/services/geminiService/gemini-service';
import { AuthFacade } from '../../auth/auth-facade/auth-facade';
import { AiContextService } from '../services/ai-context-service';

class AuthFacadeStub {
  firstName = signal<string>('');
}

class AiContextServiceStub {
  // Return a minimal context so the facade's prompt template can build a string.
  load = jasmine.createSpy('load').and.returnValue(
    Promise.resolve({ gym: { name: 'Test Gym' } }),
  );
}

describe('AiAssistantFacade', () => {
  let facade: AiAssistantFacade;
  let geminiMock: jasmine.SpyObj<GeminiService>;
  let authFacadeStub: AuthFacadeStub;
  let aiContextServiceStub: AiContextServiceStub;

  beforeEach(async () => {
    geminiMock = jasmine.createSpyObj('GeminiService', ['chat']);
    authFacadeStub = new AuthFacadeStub();
    aiContextServiceStub = new AiContextServiceStub();

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AiAssistantFacade,
        { provide: GeminiService, useValue: geminiMock },
        { provide: AuthFacade, useValue: authFacadeStub },
        { provide: AiContextService, useValue: aiContextServiceStub },
      ],
    });

    facade = TestBed.inject(AiAssistantFacade);

    // The facade's constructor kicks off an async loadContext() call. Flush
    // microtasks so websiteContext is populated before any test exercises it.
    await Promise.resolve();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should start with empty messages, no error, and loading false', () => {
    expect(facade.messages()).toEqual([]);
    expect(facade.loading()).toBeFalse();
    expect(facade.error()).toBeNull();
  });

  it('should not call the API when sendMessage receives an empty or whitespace string', async () => {
    await facade.sendMessage('   ');
    expect(geminiMock.chat).not.toHaveBeenCalled();
    expect(facade.messages()).toEqual([]);
    expect(facade.loading()).toBeFalse();
  });

  it('should add user and assistant messages on a successful send and clear loading', async () => {
    geminiMock.chat.and.returnValue(Promise.resolve('Hello, world!'));

    await facade.sendMessage('Hi');

    // The facade wraps the user text in a prompt before calling the API,
    // so we verify the call happened exactly once and included the user's text.
    expect(geminiMock.chat).toHaveBeenCalledTimes(1);
    const sentPrompt = geminiMock.chat.calls.mostRecent().args[0] as string;
    expect(sentPrompt).toContain('Hi');

    const msgs = facade.messages();
    expect(msgs.length).toBe(2);
    expect(msgs[0].role).toBe('user');
    expect(msgs[0].text).toBe('Hi');
    expect(msgs[0].pending).toBeFalse();

    expect(msgs[1].role).toBe('assistant');
    expect(msgs[1].text).toBe('Hello, world!');
    expect(msgs[1].pending).toBeFalse();

    expect(facade.loading()).toBeFalse();
    expect(facade.error()).toBeNull();
  });

  it('should toggle loading while a request is in flight', async () => {
    let resolveChat!: (value: string) => void;
    geminiMock.chat.and.returnValue(
      new Promise<string>((resolve) => {
        resolveChat = resolve;
      }),
    );

    const inFlight = facade.sendMessage('How are you?');

    // While the promise is pending
    expect(facade.loading()).toBeTrue();
    const pendingMsgs = facade.messages();
    expect(pendingMsgs.length).toBe(2);
    expect(pendingMsgs[0].role).toBe('user');
    expect(pendingMsgs[0].text).toBe('How are you?');
    expect(pendingMsgs[1].role).toBe('assistant');
    expect(pendingMsgs[1].pending).toBeTrue();
    expect(pendingMsgs[1].text).toBe('');

    resolveChat('Doing great!');
    await inFlight;

    expect(facade.loading()).toBeFalse();
    expect(facade.messages()[1].text).toBe('Doing great!');
    expect(facade.messages()[1].pending).toBeFalse();
  });

  it('should surface an error message and replace the pending assistant bubble on failure', async () => {
    geminiMock.chat.and.rejectWith(new Error('AI service unavailable'));

    await facade.sendMessage('Tell me a joke');

    expect(facade.loading()).toBeFalse();
    expect(facade.error()).toBe('AI service unavailable');

    const msgs = facade.messages();
    expect(msgs.length).toBe(2);
    expect(msgs[0].role).toBe('user');
    expect(msgs[0].text).toBe('Tell me a joke');
    expect(msgs[1].role).toBe('assistant');
    expect(msgs[1].pending).toBeFalse();
    expect(msgs[1].text).toBeTruthy(); // error placeholder text shown to the user
  });

  it('should show a fallback assistant message when the API returns an empty response', async () => {
    geminiMock.chat.and.returnValue(Promise.resolve(''));

    await facade.sendMessage('Anything?');

    const msgs = facade.messages();
    expect(msgs[1].role).toBe('assistant');
    expect(msgs[1].text).toBe('(empty response)');
    expect(facade.error()).toBeNull();
  });

  it('should clear messages and error when clear() is called', async () => {
    geminiMock.chat.and.rejectWith(new Error('boom'));
    await facade.sendMessage('hi');
    expect(facade.messages().length).toBe(2);
    expect(facade.error()).toBe('boom');

    facade.clear();

    expect(facade.messages()).toEqual([]);
    expect(facade.error()).toBeNull();
  });

  describe('open state', () => {
    it('should start closed', () => {
      expect(facade.open()).toBeFalse();
    });

    it('should flip the open state when toggle() is called', () => {
      facade.toggle();
      expect(facade.open()).toBeTrue();
      facade.toggle();
      expect(facade.open()).toBeFalse();
    });

    it('should force closed when close() is called, even after toggling open', () => {
      facade.toggle();
      expect(facade.open()).toBeTrue();
      facade.close();
      expect(facade.open()).toBeFalse();
    });
  });
});