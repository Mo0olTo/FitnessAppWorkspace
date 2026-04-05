import { inject } from '@angular/core';
import { API_URL } from '../tokens/tokens';

export class AuthEndPoint {
  
  //* REGISTER AND LOGIN
  static SIGNIN = `/auth/signin`;
  static SIGNUP = `/auth/signup`;
  static LOGOUT = `/auth/logout`;
  //* FORGET PASSWORD
  static FORGETPASSWORD = `/auth/forgotPassword`;
  static VERIFY = `/auth/verifyResetCode`;
  static RESETPASSWORD = `/auth/resetPassword`;
}
