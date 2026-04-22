import { Component, input, output } from '@angular/core';
import { ReusableInput } from "../reusable-input/reusable-input";
import { FormButton } from "../form-button/form-button";
import { RouterLink } from "@angular/router";
import { FormTitle } from "../form-title/form-title";

@Component({
  selector: 'app-auth-form',
  imports: [ReusableInput, FormButton, RouterLink, FormTitle],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {

  formType=input<'login' |'register'>('login')

}
