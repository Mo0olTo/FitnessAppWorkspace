import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  AuthLib,
  IForgetPasswordReq,
  IResetReq,
  IUser,
  IVerifyReq,
  ISignInReq,
  ISignUpReq,
} from 'auth-lib';
import { CookieService } from 'ngx-cookie-service';
import { finalize, Subject, takeUntil } from 'rxjs';
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
  userPhoto = signal<string>('');
  weight = signal<number>(0);

  // forget-pass step management
  forgetPassStep = signal<Extract<FormType, 'forgetPass' | 'otp' | 'newPass'>>('forgetPass');
  private readonly resetEmail = signal<string>('');
  // Check Token
  checkAuthStatus(): void {
    const hasToken = this.cookieService.check('FitnessToken');
} 



constructor() {
  this.initializeSession();
} 



 initializeSession(): void {
  const token = this.cookieService.get('FitnessToken');

  if (!token) {
    this.authReady.set(true);
    return;
  } 

  this.loadUserAfterLogin(false) 
  
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
          this.cookieService.set('FitnessToken', res.token, {
            path: '/',
            sameSite: 'Strict',
            secure: true,
          });

          // load user info to add welcome message
          this.loadUserAfterLogin(true);
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
  loadUserAfterLogin(redirect = false): void {
    this.loading.loading.set(true);
    this.auth
      .GetLoggedUserData()
      .pipe(
        finalize(() =>{
           this.loading.loading.set(false) 
          this.authReady.set(true)
        }),
        
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res: IUser) => {
          this.user.set(res);
          this.firstName.set(res.user.firstName);
          this.goal.set(res.user.goal);
          this.activityLevel.set(res.user.activityLevel);
          this.weight.set(res.user.weight); 
          this.userPhoto.set(res.user.photo)
          if (redirect) {
            this.router.navigate(['/main/home']);
          }
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

  

}
