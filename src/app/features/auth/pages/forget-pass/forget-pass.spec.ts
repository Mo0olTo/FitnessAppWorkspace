import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPass } from './forget-pass';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { signal } from '@angular/core';

// ── Fake facade ──────────────────────────────────────────────────────────────
const mockFacade = {
  forgetPassStep: signal<'forgetPass' | 'otp' | 'newPass'>('forgetPass'),
  forgetPassword: jasmine.createSpy('forgetPassword'),
  verifyCode:     jasmine.createSpy('verifyCode'),
  resetPassword:  jasmine.createSpy('resetPassword'),
};

describe('ForgetPass', () => {
  let component: ForgetPass;
  let fixture: ComponentFixture<ForgetPass>;

  beforeEach(async () => {
    // reset before component creation to avoid stale step on detectChanges
    mockFacade.forgetPassStep.set('forgetPass');
    mockFacade.forgetPassword.calls.reset();
    mockFacade.verifyCode.calls.reset();
    mockFacade.resetPassword.calls.reset();

    await TestBed.configureTestingModule({
      imports: [ForgetPass],
    })
    .overrideProvider(AuthFacade, { useValue: mockFacade })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Creation ────────────────────────────────────────────────────────────────
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── currentStep reflects facade signal ──────────────────────────────────────
  it('should start on forgetPass step', () => {
    expect(component.currentStep()).toBe('forgetPass');
  });

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 1 — forgetPass
  // ══════════════════════════════════════════════════════════════════════════════

  describe('Step 1 — forgetPass', () => {

    it('emailErrors: should return required when email is empty', () => {
      component.forgetEmail.set('');
      expect(component.emailErrors()).toEqual({ required: true });
    });

    it('emailErrors: should return email error for invalid format', () => {
      component.forgetEmail.set('not-an-email');
      expect(component.emailErrors()).toEqual({ email: true });
    });

    it('emailErrors: should return undefined for valid email', () => {
      component.forgetEmail.set('test@example.com');
      expect(component.emailErrors()).toBeUndefined();
    });

    it('isFormValid: should be false when email is invalid', () => {
      component.forgetEmail.set('bad');
      expect(component.isFormValid()).toBeFalse();
    });

    it('isFormValid: should be true when email is valid', () => {
      component.forgetEmail.set('test@example.com');
      expect(component.isFormValid()).toBeTrue();
    });

    it('onSubmit: should mark email touched when submitted with invalid email', () => {
      component.forgetEmail.set('');
      component.onSubmit();
      expect(component.emailTouched()).toBeTrue();
      expect(mockFacade.forgetPassword).not.toHaveBeenCalled();
    });

    it('onSubmit: should call facade.forgetPassword with valid email', () => {
      component.forgetEmail.set('test@example.com');
      component.onSubmit();
      expect(mockFacade.forgetPassword).toHaveBeenCalledOnceWith('test@example.com');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 2 — otp
  // ══════════════════════════════════════════════════════════════════════════════

  describe('Step 2 — otp', () => {

    beforeEach(() => {
      mockFacade.forgetPassStep.set('otp');
    });

    it('otpErrors: should return required when otp is empty', () => {
      component.otpValue.set('');
      expect(component.otpErrors()).toEqual({ required: true });
    });

    it('otpErrors: should return required when otp is less than 4 chars', () => {
      component.otpValue.set('123');
      expect(component.otpErrors()).toEqual({ required: true });
    });

    it('otpErrors: should return undefined for 4-char otp', () => {
      component.otpValue.set('1234');
      expect(component.otpErrors()).toBeUndefined();
    });

    it('onSubmit: should NOT call verifyCode when otp is too short', () => {
      component.otpValue.set('12');
      component.onSubmit();
      expect(mockFacade.verifyCode).not.toHaveBeenCalled();
    });

    it('onSubmit: should call facade.verifyCode with valid otp', () => {
      component.otpValue.set('5678');
      component.onSubmit();
      expect(mockFacade.verifyCode).toHaveBeenCalledOnceWith('5678');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════════
  // STEP 3 — newPass
  // ══════════════════════════════════════════════════════════════════════════════

  describe('Step 3 — newPass', () => {

    beforeEach(() => {
      mockFacade.forgetPassStep.set('newPass');
    });

    it('newPassErrors: should return required when password is empty', () => {
      component.newPass.set('');
      expect(component.newPassErrors()).toEqual({ required: true });
    });

    it('newPassErrors: should return pattern error for weak password', () => {
      component.newPass.set('weakpass');
      expect(component.newPassErrors()).toEqual({ pattern: true });
    });

    it('rePassErrors: should return required when rePass is empty', () => {
      component.rePass.set('');
      expect(component.rePassErrors()).toEqual({ required: true });
    });

    it('rePassErrors: should return mismatch when passwords differ', () => {
      component.newPass.set('Strong@1');
      component.rePass.set('Different@1');
      expect(component.rePassErrors()).toEqual({ mismatch: true });
    });

    it('rePassErrors: should return undefined when passwords match', () => {
      component.newPass.set('Strong@1');
      component.rePass.set('Strong@1');
      expect(component.rePassErrors()).toBeUndefined();
    });

    it('onSubmit: should mark both fields touched when form is invalid', () => {
      component.newPass.set('');
      component.rePass.set('');
      component.onSubmit();
      expect(component.newPassTouched()).toBeTrue();
      expect(component.rePassTouched()).toBeTrue();
      expect(mockFacade.resetPassword).not.toHaveBeenCalled();
    });

    it('onSubmit: should call facade.resetPassword with valid matching passwords', () => {
      component.newPass.set('Strong@1');
      component.rePass.set('Strong@1');
      component.onSubmit();
      expect(mockFacade.resetPassword).toHaveBeenCalledOnceWith('Strong@1');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════════
  // onFieldBlur
  // ══════════════════════════════════════════════════════════════════════════════

  describe('onFieldBlur', () => {

    it('should set emailTouched on blur', () => {
      component.onFieldBlur('email');
      expect(component.emailTouched()).toBeTrue();
    });

    it('should set otpTouched on blur', () => {
      component.onFieldBlur('otpValue');
      expect(component.otpTouched()).toBeTrue();
    });

    it('should set newPassTouched on blur', () => {
      component.onFieldBlur('password');
      expect(component.newPassTouched()).toBeTrue();
    });

    it('should set rePassTouched on blur', () => {
      component.onFieldBlur('rePassword');
      expect(component.rePassTouched()).toBeTrue();
    });
  });
});