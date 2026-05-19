import { Component, computed, inject, signal } from '@angular/core';
import { AuthForm } from '../../components/auth-form/auth-form';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { PASS_PATTERN } from '../../../../shared/validators/PASS-PATTERN';
import { Knob } from '../../components/knob/knob';
import { FormTitle } from '../../components/form-title/form-title';
import { FormButton } from '../../components/form-button/form-button';
import { RadioButton } from '../../components/radio-button/radio-button';
import { Horizontal } from '../../components/horizontal/horizontal';
import { ISignUpReq } from 'auth-lib';

@Component({
  selector: 'app-register',
  imports: [AuthForm, Knob, FormTitle, FormButton, RadioButton, Horizontal],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly _authFacade = inject(AuthFacade);
  form = signal<ISignUpReq>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    gender: '',
    height: 0,
    weight: 0,
    age: 0,
    goal: '',
    activityLevel: '',
  });
  readonly steps = [
    ['auth'],
    ['gender'],
    ['age'],
    ['weight'],
    ['height'],
    ['goal'],
    ['activityLevel'],
  ];
  firstNameTouched = signal(false);
  lastNameTouched = signal(false);
  emailTouched = signal(false);
  passwordTouched = signal(false);
  ageRange = Array.from({ length: 80 - 20 + 1 }, (_, i) => i + 20);
  weightRange = Array.from({ length: 150 - 40 + 1 }, (_, i) => i + 40);
  heightRange = Array.from({ length: 200 - 140 + 1 }, (_, i) => i + 140);

  updateField<K extends keyof ISignUpReq>(key: K, value: ISignUpReq[K]): void {
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
      rePassword: f.rePassword !== f.password ? { mismatch: true } : null,
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
    const f = this.form();

    return !!(
      f.firstName &&
      f.lastName &&
      f.email &&
      f.password &&
      f.gender &&
      f.age &&
      f.height &&
      f.weight &&
      f.goal &&
      f.activityLevel
    );
  });

  currentStep = signal(0);
  totalSteps = signal(this.steps.length);
  buttonText = computed(() => (this.currentStep() === this.steps.length - 1 ? 'Register' : 'Next'));

  nextStep(): void {
    const isLastStep = this.currentStep() === this.steps.length - 1;

    if (isLastStep) {
      this.onSubmit();
    } else if (this.currentStep() < this.steps.length) {
      this.currentStep.update((s) => s + 1);
    }
  }
  selectedGender = signal<string | null>(null);

  selectGender(gender: string) {
    this.selectedGender.set(gender);

    this.updateField('gender', gender);
  }
  onAgeChange(age: number) {
    this.updateField('age', age);

    console.log(this.form().age);
  }
  onWeightChange(weight: number) {
    this.updateField('weight', weight);

    console.log(this.form().weight);
  }
  onHeightChange(height: number) {
    this.updateField('height', height);

    console.log(this.form().height);
  }

  readonly goals = [
    { label: 'Gain weight', value: 'gain-weight' },
    {
      label: 'Lose weight',
      value: 'lose-weight',
    },
    { label: 'Get fitter', value: 'get-fitter' },
    { label: 'Gain more flexible', value: 'gain-more-flexible' },
    { label: 'Learn the basics', value: 'learn-the-basics' },
  ];

  readonly activityLevels = [
    { label: 'Rookie', value: 'level1' },
    { label: 'Beginner', value: 'level2' },
    { label: 'Intermediate', value: 'level3' },
    { label: 'Advanced', value: 'level4' },
    { label: 'True Beast', value: 'level5' },
  ];
  readonly isStep0Valid = computed(() => {
    const f = this.form();
    const e = this.errors();
    return !!(
      f.firstName &&
      f.lastName &&
      f.email &&
      f.password &&
      !e.firstName &&
      !e.lastName &&
      !e.email &&
      !e.password
    );
  });

  readonly isStep1Valid = computed(() => !!this.form().gender);
  readonly isStep2Valid = computed(() => this.form().age > 0);

  readonly canGoNext = computed(() => {
    switch (this.currentStep()) {
      case 0:
        return this.isStep0Valid();

      case 1:
        return this.isStep1Valid();

      case 2:
        return this.form().age > 0;

      case 3:
        return this.form().weight > 0;

      case 4:
        return this.form().height > 0;

      case 5:
        return !!this.form().goal;

      case 6:
        return !!this.form().activityLevel;

      default:
        return false;
    }
  });

  onSubmit(): void {
    if (!this.canGoNext()) return;
    const payload = {
      ...this.form(),
      rePassword: this.form().password,
    };

    if (this.isFormValid()) {
      this._authFacade.register(payload);

      console.log('Sent successfully:  :', payload);
    } else {
      console.log(this._authFacade.error());
    }
  }
}
