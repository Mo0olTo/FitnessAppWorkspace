import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseableCarousel } from './carousel';

describe('ReuseableCarousel', () => {
  let component: ReuseableCarousel;
  let fixture: ComponentFixture<ReuseableCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReuseableCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReuseableCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
