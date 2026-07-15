import { TestBed } from '@angular/core/testing';

import { AiContextService } from './ai-context-service';

describe('AiContextService', () => {
  let service: AiContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
