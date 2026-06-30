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

  it('should show one visible card on mobile widths', () => {
    component.screenWidth.set(375);
    expect(component.numVisible()).toBe(1);
    expect(component.numScroll()).toBe(1);
  });

  it('should scroll one card at a time on desktop widths', () => {
    component.screenWidth.set(1440);
    expect(component.numVisible()).toBe(3);
    expect(component.numScroll()).toBe(1);
  });
});
