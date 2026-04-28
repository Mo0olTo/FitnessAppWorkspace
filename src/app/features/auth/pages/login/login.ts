
import { Component, computed,  inject,  signal } from '@angular/core';
import { AuthForm } from "../../components/auth-form/auth-form";
import { PASS_PATTERN } from '../../../../shared/validators/PASS-PATTERN';
import { AuthFormState } from '../../../../shared/models/authFormState';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { ISignInReq } from 'auth-lib';


@Component({
  selector: 'app-login',
  imports: [AuthForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {


  private readonly authFacade=inject(AuthFacade)


    email= signal<string>('');
    password= signal<string>(''); 


     emailTouched= signal<boolean>(false);
     passwordTouched= signal<boolean>(false); 
    

      emailErrors = computed(() => {
        const v = this.email();
        if (!v) return { required: true };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return { email: true };
        return undefined;
      });
    
      passwordErrors = computed(() => {
       const v = this.password();
       if (!v) return { required: true };
       if (!PASS_PATTERN.test(v)) return { pattern: true };
       return null;
     });

      errors = computed(() => ({
       email: this.emailErrors(),
       password: this.passwordErrors()
    }));

     touched = computed(() => ({
      email: this.emailTouched(),
      password: this.passwordTouched()
      }));



      isFormValid = computed(() =>
       !this.emailErrors()     &&
      !this.passwordErrors()
      );


    touch(field: 'email' | 'password') {
       if (field === 'email') this.emailTouched.set(true);
       if (field === 'password') this.passwordTouched.set(true);
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

      
    
     onSubmit():void {
       this.markAllTouched();
          if (this.isFormValid()){
           this.authFacade.login({
              email:this.email(),
              password:this.password()
           })
         }

      }




  
}
