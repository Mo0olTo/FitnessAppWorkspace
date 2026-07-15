import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReusableInput } from './reusable-input';
import { FormControl, NgControl } from '@angular/forms';

describe('ReusableInput', () => {
  let component: ReusableInput;
  let fixture: ComponentFixture<ReusableInput>;


  //NgControl mock
    class MockNgControl extends NgControl {
      control = new FormControl();
      viewToModelUpdate() {}
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInput],
    })  .overrideComponent(ReusableInput, {
      add: {
        providers: [{ provide: NgControl, useClass: MockNgControl }]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableInput);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});