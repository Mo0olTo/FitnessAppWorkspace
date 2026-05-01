import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthLib, ISignInReq, IUser } from 'auth-lib';
import { CookieService } from 'ngx-cookie-service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly auth = inject(AuthLib);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly destroy$ = new Subject<void>();

  loading = signal(false);
  user = signal<IUser | null>(null);
  error = signal<string | null>(null);
  isLogged = computed(() => this.user() !== null);
  firstName = signal<string>('');

  // login
  login(data: ISignInReq): void {
    this.loading.set(true);
    this.error.set(null);

    this.auth
      .SignIn(data)
      .pipe(
        finalize(() => this.loading.set(false)),
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
            this.loadUserAfterLogin();

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
    this.loading.set(true);
    this.auth
      .GetLoggedUserData()
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res: IUser) => {
          this.user.set(res);
          this.firstName.set(res.user.firstName);
          this.router.navigate(['/main/home']);
        },

        error: () => {
          this.user.set(null);
        },
      });
  }
}
