import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsModal } from './options-modal';

describe('OptionsModal', () => {
  let component: OptionsModal;
  let fixture: ComponentFixture<OptionsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
