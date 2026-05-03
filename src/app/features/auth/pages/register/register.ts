import { Component, computed, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/auth-form/auth-form';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { PASS_PATTERN } from '../../../../shared/validators/PASS-PATTERN';

import { Knob } from '../../components/knob/knob';
import { FormTitle } from '../../components/form-title/form-title';
import { FormButton } from '../../components/form-button/form-button';
import { RadioButton } from '../../components/radio-button/radio-button';
import { Horizontal } from '../../components/horizontal/horizontal';

@Component({
  selector: 'app-register',
  imports: [AuthForm, Knob, FormTitle, FormButton, RadioButton, Horizontal],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly _authFacade = inject(AuthFacade);
  form = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    height: null as number | null,
    weight: null as number | null,
    age: null as number | null,
    goal: '',
    activityLevel: '',
  });
  readonly steps = [
    ['firstName', 'lastName'],
    ['email', 'password'],
    ['gender'],
    ['height', 'weight', 'age'],
    ['goal'],
    ['activityLevel'],
  ];
  firstNameTouched = signal('false');
  lastNameTouched = signal(false);
  emailTouched = signal(false);
  passwordTouched = signal(false);
  ageRange = Array.from({ length: 80 - 20 + 1 }, (_, i) => i + 20);
  updateField<K extends keyof ReturnType<typeof this.form>>(
    key: K,
    value: ReturnType<typeof this.form>[K],
  ): void {
    this.form.update((f) => ({
      ...f,
      [key]: value,
    }));
  }

  readonly errors = computed(() => {
    const f = this.form();

    return {
      firstName: this.validateName(f.firstName),
      lastName: this.validateName(f.lastName),
      email: this.validateEmail(f.email),
      password: this.validatePassword(f.password),
    };
  });

  validateName(v: string) {
    if (!v) return { required: true };
    if (v.length < 3) return { minLength: true };
    if (!/^[A-Za-z\u0600-\u06FF ]+$/.test(v)) return { pattern: true };
    return null;
  }
  validateEmail(v: string) {
    if (!v) return { required: true };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { email: true };
    return null;
  }

  validatePassword(v: string) {
    if (!v) return { required: true };
    if (!PASS_PATTERN.test(v)) return { weakPassword: true };
    return null;
  }
  readonly touched = computed(() => {
    return {
      firstName: this.firstNameTouched(),
      lastName: this.lastNameTouched(),
      email: this.emailTouched(),
      password: this.passwordTouched(),
    };
  });

  readonly isFormValid = computed(() => {
    const errs = this.errors();
    return Object.values(errs).every((e) => e === null);
  });

  currentStep = signal(0);
  totalSteps = signal(7);
  buttonText = computed(() => (this.currentStep() === this.steps.length - 1 ? 'Register' : 'Next'));

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
    }
  }

  nextStep(): void {
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update((s) => s + 1);
    }
  }
  selectedGender = signal<string | null>(null);

  selectGender(gender: string) {
    this.selectedGender.set(gender);
  }
  onAgeChange(age: number) {
    this.updateField('age', age);

    console.log(this.form().age);
  }
  onSubmit(): void {
    console.log(this.form().firstName);
  }
}
