import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

import { Classes } from './classes';
import { MuscleFacade } from '../../store/muscles/muscles.facade';

describe('Classes', () => {
  let component: Classes;
  let fixture: ComponentFixture<Classes>;
  let facadeMock: jasmine.SpyObj<MuscleFacade>;

  beforeEach(async () => {
    facadeMock = jasmine.createSpyObj('MuscleFacade', ['loadAllMuscles', 'loadMusclesbyId'], {
      allMuscles: signal([]),
      muscleGroup: signal([]),
      isloading: signal(false),
      error: signal<string | null>(null),
    });

    await TestBed.configureTestingModule({
      imports: [Classes],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MuscleFacade, useValue: facadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Classes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all muscles on init', () => {
    expect(facadeMock.loadAllMuscles).toHaveBeenCalled();
  });

  it('should load muscle group when tab changes', () => {
    component.onCategoryChange({ id: 'muscle-1', label: 'Chest' });

    expect(facadeMock.loadMusclesbyId).toHaveBeenCalledWith('muscle-1');
  });
});
