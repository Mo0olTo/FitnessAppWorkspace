import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMsg } from './validation-msg';

describe('ValidationMsg', () => {
  let component: ValidationMsg;
  let fixture: ComponentFixture<ValidationMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationMsg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationMsg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
