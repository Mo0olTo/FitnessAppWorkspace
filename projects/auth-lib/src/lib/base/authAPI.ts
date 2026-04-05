import { Observable } from "rxjs";
import { AdaptedSignUpRes } from "../interfaces/adapter/AdaptedSignUpRes";
import { ISignUpReq } from "../interfaces/sign-up/ISignUpReq";
import { ISignInReq } from "../interfaces/sign-in/ISignInReq";
import { AdaptedSignInRes } from "../interfaces/adapter/AdaptedSignInRes";
import { IForgetPasswordReq } from "../interfaces/forget-password/IForgetReq";
import { IForgetPasswordRes } from "../interfaces/forget-password/IForgetRes";
import { IVerifyReq } from "../interfaces/verify-code/IVerifyReq";
import { IVerifyRes } from "../interfaces/verify-code/IVerifyRes";
import { IResetReq } from "../interfaces/reset-password/IResetReq";
import { IResetRes } from "../interfaces/reset-password/IResetRes";
import { ILogOutRes } from "../interfaces/log-out/ILogOutRes";


export abstract class authAPI {
  abstract SignUp(data: ISignUpReq): Observable<AdaptedSignUpRes>;
  abstract SignIn(data: ISignInReq): Observable<AdaptedSignInRes>;
  abstract LogOut(): Observable<ILogOutRes>;
  abstract ForgetPassword(data: IForgetPasswordReq): Observable<IForgetPasswordRes>;
  abstract VerifyCode(data: IVerifyReq): Observable<IVerifyRes>;
  abstract ResetPassword(data: IResetReq): Observable<IResetRes>;
}
