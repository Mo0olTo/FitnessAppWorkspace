import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBar } from './services-bar';

describe('ServicesBar', () => {
  let component: ServicesBar;
  let fixture: ComponentFixture<ServicesBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
