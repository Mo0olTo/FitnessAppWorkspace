import { Observable } from 'rxjs';
import { AdaptedSignUpRes } from '../interfaces/adapter/AdaptedSignUpRes';
import { ISignUpReq } from '../interfaces/sign-up/ISignUpReq';
import { ISignInReq } from '../interfaces/sign-in/ISignInReq';
import { AdaptedSignInRes } from '../interfaces/adapter/AdaptedSignInRes';
import { IForgetPasswordReq } from '../interfaces/forget-password/IForgetReq';
import { IForgetPasswordRes } from '../interfaces/forget-password/IForgetRes';
import { IVerifyReq } from '../interfaces/verify-code/IVerifyReq';
import { IVerifyRes } from '../interfaces/verify-code/IVerifyRes';
import { IResetReq } from '../interfaces/reset-password/IResetReq';
import { IResetRes } from '../interfaces/reset-password/IResetRes';
import { ILogOutRes } from '../interfaces/log-out/ILogOutRes';
import { IChangePassReq } from '../interfaces/change-password/IChangePassReq';
import { IChangePassRes } from '../interfaces/change-password/IChangePassRes';
import { IEditReq } from '../interfaces/edit-profile/IEditReq';
import { IEditRes } from '../interfaces/edit-profile/IEditRes';
import { IUser } from '../interfaces/logged-user/IUser';
import { IUploadPhotoReq } from '../interfaces/upload-photo/IPhotoReq';
import { IUploadPhotoRes } from '../interfaces/upload-photo/IPhotoRes';

export abstract class authAPI {
  abstract SignUp(data: ISignUpReq): Observable<AdaptedSignUpRes>;
  abstract SignIn(data: ISignInReq): Observable<AdaptedSignInRes>;
  abstract LogOut(): Observable<ILogOutRes>;
  abstract ForgetPassword(data: IForgetPasswordReq): Observable<IForgetPasswordRes>;
  abstract VerifyCode(data: IVerifyReq): Observable<IVerifyRes>;
  // PUT /auth/resetPassword (otp flow)
  abstract ResetPassword(data: IResetReq): Observable<IResetRes>;
  // PATCH /auth/change-password (Authorization via HTTP interceptor)
  abstract ChangePassword(data: IChangePassReq): Observable<IChangePassRes>;
  // PUT /auth/edit-profile (Authorization via HTTP interceptor)
  abstract EditProfile(data: IEditReq): Observable<IEditRes>;
  // PUT /auth/upload-photo (Authorization via HTTP interceptor)
  abstract UploadPhoto(data: IUploadPhotoReq): Observable<IUploadPhotoRes>;
  // GET logged user data (Authorization via HTTP interceptor)
  abstract GetLoggedUserData(): Observable<IUser>;
}
