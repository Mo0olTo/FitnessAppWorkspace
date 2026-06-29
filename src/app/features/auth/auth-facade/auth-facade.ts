import { IChangePassReq } from './../../../../../projects/auth-lib/src/lib/interfaces/change-password/IChangePassReq';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AuthLib,
  IForgetPasswordReq,
  IResetReq,
  IUser,
  IVerifyReq,
  ISignInReq,
  ISignUpReq,
  IEditReq,
  IEditRes,
  IUploadPhotoReq,
} from 'auth-lib';
import { CookieService } from 'ngx-cookie-service';
import { finalize, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../shared/services/loading/loadingService';
import { FormType } from '../components/auth-form/models/formType';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly auth = inject(AuthLib);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly destroy$ = new Subject<void>();
  private readonly loading = inject(LoadingService);

  user = signal<IUser | null>(null);
  error = signal<string | null>(null);
  authReady = signal(false);
  isLogged = computed(() => this.user() !== null);
  firstName = signal<string>('');
  goal = signal<string>('');
  activityLevel = signal<string>('');
  weight = signal<number>(0);
  // forget-pass step management
  forgetPassStep = signal<Extract<FormType, 'forgetPass' | 'otp' | 'newPass'>>('forgetPass');
  private readonly resetEmail = signal<string>('');
  // Check Token
  checkAuthStatus(): void {
    const hasToken = this.cookieService.check('FitnessToken');

    if (hasToken) {
      this.loadUserAfterLogin();
    } else {
      this.user.set(null);
    }
  }
  // start Register
  register(data: ISignUpReq): void {
    this.loading.loading.set(true);
    this.error.set(null);

    this.auth
      .SignUp(data)
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.messageService.add({
              severity: 'success',
              summary: 'Registration successful',
              detail: 'You can now log in with your credentials',
            });

            this.router.navigate(['/auth/login']);
          }
        },
        error: (err) => {
          this.error.set(err.error.error || 'Registration Failed');
          this.messageService.add({
            severity: 'error',
            summary: `${this.error() ?? 'Registration Failed'}`,
            life: 3000,
          });
        },
      });
  }
  // end Register

  // login
  login(data: ISignInReq): void {
    this.loading.loading.set(true);
    this.error.set(null);

    this.auth
      .SignIn(data)
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {
            // saving Token to Cookies
            // ! ------------------ [ NEW LOGIN ORDER ] ------------------
            // ! 1. Save Token First: The token comes from the SignIn response, not user data.
            this.cookieService.set('FitnessToken', res.token, {
              path: '/',
              sameSite: 'Strict',
              secure: true,
            });

            // * TODO: Nested the data fetch here so router.navigate ONLY runs after signals are fully populated.
            // * This prevents the async race condition where navigation used to beat the HTTP response.
            this.auth.GetLoggedUserData().subscribe({
              next: (userRes: IUser) => {
                this.user.set(userRes);
                this.firstName.set(userRes.user.firstName);
                this.goal.set(userRes.user.goal);
                this.activityLevel.set(userRes.user.activityLevel);
                this.weight.set(userRes.user.weight);

                // ? Navigation now executes safely INSIDE the subscription block.
                this.router.navigate(['/main/home']);
              },
            });
            // toster {WELCOME MESSAGE HERE}
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: `Welcome ${this.firstName()}`,
                detail: 'login Success',
                life: 4000,
              });
            }, 500);
          }
        },
        error: (err) => {
          this.error.set(err.error.error || 'Login Failed');
          this.messageService.add({
            severity: 'error',
            summary: `${this.error()}`,
            detail: 'login Failed',
            life: 3000,
          });
        },
      });
  }

  // load user Data after login
  loadUserAfterLogin(): void {
    this.loading.loading.set(true);
    this.auth
      .GetLoggedUserData()
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res: IUser) => {
          this.user.set(res);
          this.firstName.set(res.user.firstName);
          this.goal.set(res.user.goal);
          this.activityLevel.set(res.user.activityLevel);
          this.weight.set(res.user.weight);
          // ! ------------------ [ CRITICAL BREAKING CHANGE NOTICE ] ------------------
          // ! WARNING: Removed (this.router.navigate) from this method entirely!
          // ? Reason: This method runs automatically on app refresh via APP_INITIALIZER.
          // ? Leaving navigate here would force-redirect the user to /home even if they refreshed while on /profile!
          // this.router.navigate(['/main/home']);
        },

        error: () => {
          this.user.set(null);
        },
      });
  }

  // forget password — step 1: send OTP
  forgetPassword(email: string): void {
    this.loading.loading.set(true);
    this.error.set(null);
    this.auth
      .ForgetPassword({ email } as IForgetPasswordReq)
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.resetEmail.set(email);
          this.forgetPassStep.set('otp');
          this.messageService.add({
            severity: 'success',
            summary: 'OTP Sent!',
            detail: 'Check your email for the code',
            life: 3000,
          });
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Failed to send OTP');
          this.messageService.add({
            severity: 'error',
            summary: this.error()!,
            life: 3000,
          });
        },
      });
  }

  // forget password — step 2: verify OTP code
  verifyCode(code: string): void {
    this.loading.loading.set(true);
    this.error.set(null);
    this.auth
      .VerifyCode({ resetCode: code } as IVerifyReq)
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.forgetPassStep.set('newPass');
          this.messageService.add({
            severity: 'success',
            summary: 'Code Verified!',
            detail: 'Now create your new password',
            life: 3000,
          });
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Invalid or expired code');
          this.messageService.add({
            severity: 'error',
            summary: this.error()!,
            life: 3000,
          });
        },
      });
  }

  // forget password — step 3: reset password
  resetPassword(newPassword: string): void {
    this.loading.loading.set(true);
    this.error.set(null);
    this.auth
      .ResetPassword({ email: this.resetEmail(), newPassword } as IResetReq)
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.forgetPassStep.set('forgetPass');
          this.messageService.add({
            severity: 'success',
            summary: 'Password Reset!',
            detail: 'You can now login with your new password',
            life: 4000,
          });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Failed to reset password');
          this.messageService.add({
            severity: 'error',
            summary: this.error()!,
            life: 3000,
          });
        },
      });
  }

  // Change Password Function
  changePassword(data: IChangePassReq): Observable<void> {
    this.loading.loading.set(true);
    this.error.set(null);

    return this.auth.ChangePassword(data).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.loading.set(false)),
      tap(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success!',
            detail: 'Password changed successfully',
            life: 3000,
          });
        },
        (err) => {
          this.error.set(err.error?.message || 'Failed to change password');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error?.message || 'Failed to change password',
            life: 4000,
          });
        },
      ),

      map((res) => undefined),
    );
  }

  // LogOut Function
  logout() {
    this.loading.loading.set(true);
    this.error.set(null);
    this.auth
      .LogOut()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.loading.set(false)),
      )
      .subscribe({
        next: () => {
          this.cookieService.delete('FitnessToken', '/');
          this.messageService.add({
            severity: 'success',
            summary: 'Logged Out',
            detail: 'You have been logged out successfully',
            life: 3000,
          });
          // Here we redirect to the login page after one second so he can see the lovely toast
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1000);
        },
        error: (err) => {
          this.error.set(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Logout Failed',
            detail: 'Something went wrong. Please try again.',
            life: 3000,
          });
        },
      });
  }
  // edit Profile
  updateProfile(data: Partial<IEditReq>): Observable<IEditRes> {
    this.loading.loading.set(true);
    this.error.set(null);

    return this.auth.EditProfile(data as IEditReq).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading.loading.set(false)),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated!',
          detail: 'Profile updated successfully',
          life: 3000,
        });
      }),
      map(() => undefined as any),
    );
  }

  // update Photo
  updatePhoto(file: File) {
    this.loading.loading.set(true);
    this.error.set(null);

    const payload: IUploadPhotoReq = {
      photo: file,
    };

    this.auth
      .UploadPhoto(payload)
      .pipe(
        finalize(() => this.loading.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.loadUserAfterLogin();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile picture updated successfully',
            life: 3000,
          });
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Failed to upload photo');
          this.messageService.add({
            severity: 'error',
            summary: 'Upload Failed',
            detail: this.error()!,
            life: 3000,
          });
        },
      });
  }
}
