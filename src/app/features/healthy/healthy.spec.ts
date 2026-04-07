import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Healthy } from './healthy';

describe('Healthy', () => {
  let component: Healthy;
  let fixture: ComponentFixture<Healthy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Healthy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Healthy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
