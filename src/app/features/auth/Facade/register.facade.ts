import { inject, Injectable, signal } from '@angular/core';
import { AdaptedSignUpRes, AuthLib, ISignUpReq } from 'auth-lib';
import { finalize } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class RegisterFacade {
  private readonly _authLib = inject(AuthLib);
  isLoading = signal<boolean>(false);
  user = signal<AdaptedSignUpRes | null>(null);
  error = signal<any>(null);

  registerModel = signal<ISignUpReq>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    gender: '',
    height: 170,
    weight: 70,
    age: 70,
    goal: 'Gain weight',
    activityLevel: 'level1',
  });

  register() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    const data = this.registerModel();
    this._authLib
      .SignUp(data)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.user.set(res);
        },
        error: (err) => {
          this.error.set(err.error.message);
        },
      });
  }
}
