import { TestBed } from '@angular/core/testing';

import { Darkmode } from './darkmode';
import { PLATFORM_ID } from '@angular/core';

describe('Darkmode', () => {
  let service: Darkmode;

  beforeEach(() => {
    //spy on local storage getItem,setItem method
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
    
    TestBed.configureTestingModule({
      providers:[
        Darkmode ,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(Darkmode);

   
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with light theme as a default theme' , ()=>{
    expect(service.currentTheme()).toBe('light')
  });

  // test that the theme is set to dark when the system theme is dark

  it('should toggle theme between dark mood and light mood' , ()=>{
    service.setTheme('light')

    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark')

    service.toggleTheme();
    expect(service.currentTheme()).toBe('light')
  }); 


  


});
