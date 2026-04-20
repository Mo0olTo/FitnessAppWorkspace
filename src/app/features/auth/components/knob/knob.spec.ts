import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Knob } from './knob';

describe('Knob', () => {
  let component: Knob;
  let fixture: ComponentFixture<Knob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Knob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Knob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('user should write a correct values inside each input',()=>{
    expect(component.value()).toBeGreaterThan(0)
    expect(component.value()).toBe(1)
    
    expect(component.min()).toBeLessThan(1)
    expect(component.min()).toBe(0)
    
    expect(component.max()).toBeLessThan(7)
    expect(component.max()).toBeGreaterThan(0)

  }); 

});
