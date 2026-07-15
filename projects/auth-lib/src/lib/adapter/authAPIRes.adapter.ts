import { Injectable } from '@angular/core';
import { AdaptedSignInRes } from '../interfaces/adapter/AdaptedSignInRes';
import { AdaptedSignUpRes } from '../interfaces/adapter/AdaptedSignUpRes';
import { Adaptor } from '../interfaces/adapter/IAdabter';
import { ISignInRes } from '../interfaces/sign-in/ISignInRes';
import { ISignUpRes } from '../interfaces/sign-up/ISignUpRes';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIResService implements Adaptor {
  // * ADAPTOR METHODS FOR SIGNUP RESPONSE
  adaptSignUp(data: ISignUpRes): AdaptedSignUpRes {
    return {
      message: data.message,
      token: data.token,
      userId: data.user._id,
      email: data.user.email,
    };
  }

  // * ADAPTOR METHODS FOR SIGN IN RESPONSE
  adaptSignIn(data: ISignInRes): AdaptedSignInRes {
    return {
      message: data.message,
      token: data.token,
      userId: data.user._id,
      email: data.user.email,
      user:data.user,
    };
  }
}
