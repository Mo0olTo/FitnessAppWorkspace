import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableCard } from './reusable-card';

describe('ReusableCard', () => {
  let component: ReusableCard;
  let fixture: ComponentFixture<ReusableCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
