import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButton } from './form-button';

describe('FormButton', () => {
  let component: FormButton;
  let fixture: ComponentFixture<FormButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inputs should have default values' , ()=>{
    expect(component.btnTitle()).toBe('');
    expect(component.disabled()).toBe(false);
  });

  it('should not work when user gives false values' , ()=>{
    fixture.componentRef.setInput('btnTitle' , 1);
    fixture.componentRef.setInput('disabled' , 'true')

    expect(component.btnTitle()).toBeFalsy
    expect(component.disabled()).toBeFalsy
  });


  it('should work when user gives correct values' , ()=>{
    fixture.componentRef.setInput('btnTitle' , 'login');
    fixture.componentRef.setInput('disabled' , true)

    expect(component.btnTitle()).toBe('login')
    expect(component.disabled()).toBe(true)
  });



});
