import { Component, computed, input, output } from '@angular/core';
import { ReusableInput } from '../reusable-input/reusable-input';
import { FormButton } from '../form-button/form-button';
import { RouterLink } from '@angular/router';
import { FormTitle } from '../form-title/form-title';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { AuthFormState } from '../../../../shared/models/authFormState';
import { ValidationMsg } from '../validation-msg/validation-msg';
import { FormType } from './models/formType';
import { AUTH_FORM_CONFIG } from './auth-form-config/auth-form-config';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-form',
  imports: [
    ReusableInput,
    FormButton,
    RouterLink,
    FormTitle,
    InputOtpModule,
    FormsModule,
    ValidationMsg,
    TranslatePipe,
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  formType = input<FormType>('login');
  formConfig = computed(() => AUTH_FORM_CONFIG[this.formType()]);
  btnText = input<string>('');
  // login Values
  loginEmail = input<string>('');
  loginPassword = input<string>('');

  loginEmailChange = output<string>();
  loginPasswordChange = output<string>();

  // register Values
  firstName = input<string>('');
  lastName = input<string>('');
  regEmail = input<string>('');
  regPassword = input<string>('');

  firstNameChange = output<string>();
  lastNameChange = output<string>();
  regEmailChange = output<string>();
  regPasswordChange = output<string>();

  // forget-pass Values
  forgetEmail = input<string>('');

  forgetEmailChange = output<string>();

  // new-pass Values
  newPass = input<string>('');
  rePass = input<string>('');

  newPassChange = output<string>();
  rePassChange = output<string>();

  // otp values
  otpValue = input<string>('');
  otpValueChange = output<string>();

  // Button Submit for each form
  submit = output<void>();
  disabled = input<boolean>(false);

  // for Validation
  fieldBlur = output<keyof AuthFormState>();

  // form state for errors and validation
  formState = input<AuthFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    otpValue: '',
  });
  
  buttonTitle = computed(() => this.btnText?.() ?? this.formConfig().buttonText);
  errors = input<Partial<Record<keyof AuthFormState, any>>>({});
  touched = input<Partial<Record<keyof AuthFormState, boolean>>>({});

  getValue(key: string) {
    return (this as any)[key]();
  }

  emitValue(outputKey: string, value: string) {
    (this as any)[outputKey].emit(value);
  }
}
