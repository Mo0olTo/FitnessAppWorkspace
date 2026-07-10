import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthySection } from './healthy-section';

describe('HealthySection', () => {
  let component: HealthySection;
  let fixture: ComponentFixture<HealthySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthySection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
