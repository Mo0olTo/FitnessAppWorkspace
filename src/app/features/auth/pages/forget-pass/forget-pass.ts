import { Component, computed, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/auth-form/auth-form';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { PASS_PATTERN } from '../../../../shared/validators/PASS-PATTERN';
import type { AuthFormState } from '../../../../shared/models/authFormState';

@Component({
  selector: 'app-forget-pass',
  imports: [AuthForm],
  templateUrl: './forget-pass.html',
  styleUrl: './forget-pass.scss',
})
export class ForgetPass {

  private readonly authFacade = inject(AuthFacade);

  // current step driven by facade signal
  readonly currentStep = computed(() => this.authFacade.forgetPassStep());

  // ── field values ──────────────────────────────────────────────────────────
  readonly forgetEmail = signal<string>('');
  readonly otpValue    = signal<string>('');
  readonly newPass     = signal<string>('');
  readonly rePass      = signal<string>('');

  // ── touched ───────────────────────────────────────────────────────────────
  readonly emailTouched   = signal<boolean>(false);
  readonly otpTouched     = signal<boolean>(false);
  readonly newPassTouched = signal<boolean>(false);
  readonly rePassTouched  = signal<boolean>(false);

  // ── validation errors per field ───────────────────────────────────────────
  readonly emailErrors = computed(() => {
    const v = this.forgetEmail();
    if (!v) return { required: true };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { email: true };
    return undefined;
  });

  readonly otpErrors = computed(() => {
    const v = this.otpValue();
    if (!v || v.length < 4) return { required: true };
    return undefined;
  });

  readonly newPassErrors = computed(() => {
    const v = this.newPass();
    if (!v) return { required: true };
    if (!PASS_PATTERN.test(v)) return { pattern: true };
    return undefined;
  });

  readonly rePassErrors = computed(() => {
    const v = this.rePass();
    if (!v) return { required: true };
    if (v !== this.newPass()) return { mismatch: true };
    return undefined;
  });

  // ── merged errors & touched for <app-auth-form> ───────────────────────────
  readonly errors = computed(() => ({
    email:      this.emailErrors(),
    otpValue:   this.otpErrors(),
    password:   this.newPassErrors(),
    rePassword: this.rePassErrors(),
  }));

  readonly touched = computed(() => ({
    email:      this.emailTouched(),
    otpValue:   this.otpTouched(),
    password:   this.newPassTouched(),
    rePassword: this.rePassTouched(),
  }));

  // ── per-step form validity ─────────────────────────────────────────────────
  readonly isFormValid = computed(() => {
    const step = this.currentStep();
    if (step === 'forgetPass') return !this.emailErrors();
    if (step === 'otp')        return !this.otpErrors();
    if (step === 'newPass')    return !this.newPassErrors() && !this.rePassErrors();
    return false;
  });

  // ── blur handler ──────────────────────────────────────────────────────────
  onFieldBlur(field: keyof AuthFormState): void {
    if (field === 'email')      this.emailTouched.set(true);
    if (field === 'otpValue')   this.otpTouched.set(true);
    if (field === 'password')   this.newPassTouched.set(true);
    if (field === 'rePassword') this.rePassTouched.set(true);
  }

  // ── submit handler ────────────────────────────────────────────────────────
  onSubmit(): void {
    const step = this.currentStep();

    if (step === 'forgetPass') {
      this.emailTouched.set(true);
      if (this.isFormValid()) {
        this.authFacade.forgetPassword(this.forgetEmail());
      }
    }

    if (step === 'otp') {
      this.otpTouched.set(true);
      if (this.isFormValid()) {
        this.authFacade.verifyCode(this.otpValue());
      }
    }

    if (step === 'newPass') {
      this.newPassTouched.set(true);
      this.rePassTouched.set(true);
      if (this.isFormValid()) {
        this.authFacade.resetPassword(this.newPass());
      }
    }
  }
}
