import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTitle } from './section-title';

describe('SectionTitle', () => {
  let component: SectionTitle;
  let fixture: ComponentFixture<SectionTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  it('should have default input values', () => {
    expect(component.sectionTitleImage()).toBe('');
    expect(component.logo()).toBe('');
    expect(component.sectionName()).toBe('');
    expect(component.centeredName()).toBe(false);
  });

  it('should accept input values correctly', () => {
    fixture.componentRef.setInput('sectionName', 'About us Section');
    fixture.componentRef.setInput('logo', 'vector.png');
    fixture.componentRef.setInput('sectionTitleImage', 'workout.jpg');
    fixture.componentRef.setInput('centeredName', true);

    expect(component.sectionName()).toBe('About us Section');
    expect(component.logo()).toBe('vector.png');
    expect(component.sectionTitleImage()).toBe('workout.jpg');
    expect(component.centeredName()).toBe(true);
  });

});
