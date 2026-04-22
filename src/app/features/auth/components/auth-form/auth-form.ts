import { Component, input, signal } from '@angular/core';
import { ReusableInput } from "../reusable-input/reusable-input";
import { FormButton } from "../form-button/form-button";
import { RouterLink } from "@angular/router";
import { FormTitle } from "../form-title/form-title";
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  imports: [ReusableInput, FormButton, RouterLink, FormTitle ,InputOtpModule ,FormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {

  formType=input<'login' |'register' | 'forgetPass'| 'otp' | 'newPass'>('login')
  value = ''

}
