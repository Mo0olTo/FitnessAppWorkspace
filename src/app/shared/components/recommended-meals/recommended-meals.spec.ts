import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedMeals } from './recommended-meals';

describe('RecommendedMeals', () => {
  let component: RecommendedMeals;
  let fixture: ComponentFixture<RecommendedMeals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedMeals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedMeals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
