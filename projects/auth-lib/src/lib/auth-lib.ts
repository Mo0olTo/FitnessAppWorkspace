import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthAPIResService } from './adapter/authAPIRes.adapter';
import { authAPI } from './base/authAPI';
import { AuthEndPoint } from './enums/AuthEndPoints';
import { AdaptedSignInRes } from './interfaces/adapter/AdaptedSignInRes';
import { AdaptedSignUpRes } from './interfaces/adapter/AdaptedSignUpRes';
import { IChangePassReq } from './interfaces/change-password/IChangePassReq';
import { IChangePassRes } from './interfaces/change-password/IChangePassRes';
import { IEditReq } from './interfaces/edit-profile/IEditReq';
import { IEditRes } from './interfaces/edit-profile/IEditRes';
import { IForgetPasswordReq } from './interfaces/forget-password/IForgetReq';
import { IForgetPasswordRes } from './interfaces/forget-password/IForgetRes';
import { IUser } from './interfaces/logged-user/IUser';
import { ILogOutRes } from './interfaces/log-out/ILogOutRes';
import { IResetReq } from './interfaces/reset-password/IResetReq';
import { IResetRes } from './interfaces/reset-password/IResetRes';
import { ISignInReq } from './interfaces/sign-in/ISignInReq';
import { ISignInRes } from './interfaces/sign-in/ISignInRes';
import { ISignUpReq } from './interfaces/sign-up/ISignUpReq';
import { ISignUpRes } from './interfaces/sign-up/ISignUpRes';
import { IUploadPhotoReq } from './interfaces/upload-photo/IPhotoReq';
import { IUploadPhotoRes } from './interfaces/upload-photo/IPhotoRes';
import { IVerifyReq } from './interfaces/verify-code/IVerifyReq';
import { IVerifyRes } from './interfaces/verify-code/IVerifyRes';
import { API_URL } from './tokens/tokens';
import { createUrl } from './utilites/helper';



@Injectable({
  providedIn: 'root',
})
export class AuthLib extends authAPI {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  private readonly authAPIResService = inject(AuthAPIResService);
  private readonly createUrl = inject(createUrl);

  override SignUp(data: ISignUpReq): Observable<AdaptedSignUpRes> {
    return this.http
      .post<ISignUpRes>(this.createUrl(this.apiUrl,AuthEndPoint.SIGNUP), data)
      .pipe(
        map((res: ISignUpRes) => this.authAPIResService.adaptSignUp(res)),
        catchError((err) => throwError(() => err))
      );
  }

  override SignIn(data: ISignInReq): Observable<AdaptedSignInRes> {
    return this.http
      .post<ISignInRes>(this.createUrl(this.apiUrl,AuthEndPoint.SIGNIN), data)
      .pipe(
        map((res: ISignInRes) => this.authAPIResService.adaptSignIn(res)),
        catchError((err) => throwError(() => err))
      );
  }

  override LogOut(): Observable<ILogOutRes> {
    return this.http
      .get<ILogOutRes>(this.createUrl(this.apiUrl,AuthEndPoint.LOGOUT))
      .pipe(catchError((err) => throwError(() => err)));
  }

  override ForgetPassword(data: IForgetPasswordReq): Observable<IForgetPasswordRes> {
    return this.http
      .post<IForgetPasswordRes>(this.createUrl(this.apiUrl,AuthEndPoint.FORGETPASSWORD), data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  override VerifyCode(data: IVerifyReq): Observable<IVerifyRes> {
    return this.http
      .post<IVerifyRes>(this.createUrl(this.apiUrl,AuthEndPoint.VERIFY), data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  override ResetPassword(data: IResetReq): Observable<IResetRes> {
    return this.http
      .put<IResetRes>(this.createUrl(this.apiUrl,AuthEndPoint.RESETPASSWORD), data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  override ChangePassword(data: IChangePassReq): Observable<IChangePassRes> {
    return this.http
      .patch<IChangePassRes>(this.createUrl(this.apiUrl,AuthEndPoint.CHANGEPASSWORD), data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  override EditProfile(data: IEditReq): Observable<IEditRes> {
    return this.http
      .put<IEditRes>(this.createUrl(this.apiUrl,AuthEndPoint.EDITPROFILE), data)
      .pipe(catchError((err) => throwError(() => err)));
  }

  override UploadPhoto(data: IUploadPhotoReq): Observable<IUploadPhotoRes> {
    const formData = new FormData();
    formData.append('photo', data.photo);

    return this.http
      .put<IUploadPhotoRes>(this.createUrl(this.apiUrl,AuthEndPoint.UPLOADPHOTO), formData)
      .pipe(catchError((err) => throwError(() => err)));
  }

  override GetLoggedUserData(): Observable<IUser> {
    return this.http
      .get<IUser>(this.createUrl(this.apiUrl,AuthEndPoint.GETLOGGEDUSERDATA))
      .pipe(catchError((err) => throwError(() => err)));
  }
}
