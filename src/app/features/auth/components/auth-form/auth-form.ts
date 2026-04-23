import { Component, input, output } from '@angular/core';
import { ReusableInput } from "../reusable-input/reusable-input";
import { FormButton } from "../form-button/form-button";
import { RouterLink } from "@angular/router";
import { FormTitle } from "../form-title/form-title";
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { AuthFormState } from '../../../../shared/models/authFormState';
import { ValidationMsg } from "../validation-msg/validation-msg";

@Component({
  selector: 'app-auth-form',
  imports: [ReusableInput, FormButton, RouterLink, FormTitle, InputOtpModule, FormsModule, ValidationMsg],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {

  formType=input<'login' |'register' | 'forgetPass'| 'otp' | 'newPass'>('login')

  // login Values 
  loginEmail=input<string>('')
  loginPassword=input<string>('')

  loginEmailChange = output<string>();
  loginPasswordChange = output<string>();


  // register Values
  firstName=input<string>('')
  lastName=input<string>('')
  regEmail=input<string>('')
  regPassword=input<string>('')

  firstNameChange = output<string>();
  lastNameChange = output<string>();
  regEmailChange = output<string>();
  regPasswordChange = output<string>();


  // forget-pass Values
  forgetEmail=input<string>('')

  forgetEmailChange = output<string>();

  // new-pass Values
  newPass=input<string>('')
  rePass=input<string>('')
  
  newPassChange = output<string>();
  rePassChange = output<string>();

  // otp values
  otpValue = input<string>('');
  otpValueChange = output<string>();


  // Button Submit for each form
  submit = output<void>(); 

  // for Validation
  fieldBlur = output<keyof AuthFormState>(); 

  formState = input<AuthFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    otpValue: ''
  }); 

  errors = input<Partial<Record<keyof AuthFormState, any>>>({});
  touched = input<Partial<Record<keyof AuthFormState, boolean>>>({});

}
