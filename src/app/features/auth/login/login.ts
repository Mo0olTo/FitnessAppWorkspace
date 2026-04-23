
import { Component, computed,  signal } from '@angular/core';
import { AuthForm } from "../components/auth-form/auth-form";

import { PASS_PATTERN } from '../../../shared/validators/PASS-PATTERN';
import { loginFormState } from './models/loginFormState';
import { AuthFormState } from '../../../shared/models/authFormState';


@Component({
  selector: 'app-login',
  imports: [AuthForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
    readonly email     = signal<string>('');
    readonly password  = signal<string>(''); 


    readonly emailTouched     = signal<boolean>(false);
    readonly passwordTouched  = signal<boolean>(false); 




      readonly emailErrors = computed(() => {
        const v = this.email();
        if (!v) return { required: true };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { email: true };
        return undefined;
      });
    
      readonly passwordErrors = computed(() => {
        const v = this.password();
        if (!v) return { required: true };
        if (!PASS_PATTERN.test(v)) return { pattern: true };
        return null;
      });

      readonly errors = computed(() => ({
        email: this.emailErrors(),
        password: this.passwordErrors()
      }));

      readonly touched = computed(() => ({
        email: this.emailTouched(),
        password: this.passwordTouched()
      }));



      readonly isFormValid = computed(() =>
        !this.emailErrors()     &&
        !this.passwordErrors()
      );


      touch(field: 'email' | 'password') {
        if (field === 'email') this.emailTouched.set(true);
        if (field === 'password') this.passwordTouched.set(true);
      }

      patch(field: keyof loginFormState, value: string): void {
        const map: Record<keyof loginFormState, () => void> = {

          email:     () => this.email.set(value),
          password:  () => this.password.set(value),
        };
        map[field]();
      }
    
      markAllTouched(): void {

        this.emailTouched.set(true);
        this.passwordTouched.set(true);
      }
    
      reset(): void {
        this.email.set('');
        this.password.set('');

        this.emailTouched.set(false);
        this.passwordTouched.set(false);
      } 

      onFieldBlur(field: keyof AuthFormState) {

        if (field === 'email') {
          this.emailTouched.set(true);
        }
      
        if (field === 'password') {
          this.passwordTouched.set(true);
        }
      
      }
    
      onSubmit(): loginFormState | null {
        this.markAllTouched();
        if (!this.isFormValid()) return null;
        console.log(this.email() , this.password());
        return {
     
          email:     this.email(),
          password:  this.password(),
        };

       
        
      }




  // private readonly fb = inject(FormBuilder);

  // readonly passwordVisible = signal(false);

  // readonly form = this.fb.nonNullable.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', Validators.required],
  // });

  // togglePasswordVisibility(): void {
  //   this.passwordVisible.update((visible) => !visible);
  // }

  // onSubmit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }
  // }
}
