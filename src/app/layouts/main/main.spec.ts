import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { Main } from './main';
import { AiAssistantFacade } from '../../features/ai-assistant/ai-assistant-facade/ai-assistant-facade';

class AiAssistantFacadeStub {
  messages = signal<unknown[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  open = signal(false);
  sendMessage = jasmine.createSpy('sendMessage').and.returnValue(Promise.resolve());
  toggle = jasmine.createSpy('toggle');
  close = jasmine.createSpy('close');
  clear = jasmine.createSpy('clear');
}

describe('Main', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;
  let facadeStub: AiAssistantFacadeStub;

  beforeEach(async () => {
    facadeStub = new AiAssistantFacadeStub();

    await TestBed.configureTestingModule({
      imports: [Main],
      providers: [
        { provide: AiAssistantFacade, useValue: facadeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate toggleAssistant() to the AiAssistantFacade', () => {
    component['toggleAssistant']();
    expect(facadeStub.toggle).toHaveBeenCalled();
  });
});
