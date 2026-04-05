import { Injectable } from '@angular/core';
import { ISignInRes } from '../interfaces/sign-in/ISignInRes';
import { ISignUpRes } from '../interfaces/sign-up/ISignUpRes';
import { AdaptedSignUpRes } from '../interfaces/adapter/AdaptedSignUpRes';
import { AdaptedSignInRes } from '../interfaces/adapter/AdaptedSignInRes';
import { Adaptor } from '../interfaces/adapter/IAdabter';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIResService implements Adaptor {


  // * ADAPTOR METHODS FOR SIGNUP RESPONSE
  adaptSignUp(data:ISignUpRes):   AdaptedSignUpRes {
    return {
      message:data.message ,
      email: data.user.email,
      role: data.user.role
    };
  }

  // * ADAPTOR METHODS FOR SIGN IN RESPONSE
  adaptSignIn(data: ISignInRes): AdaptedSignInRes {
    return {
      message: data.message,
      token: data.token,
      role: data.user.role
    };
  }
}