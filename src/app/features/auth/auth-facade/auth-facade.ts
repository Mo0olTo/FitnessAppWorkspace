import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthLib, ISignInReq, IUser } from 'auth-lib';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {

  private readonly auth=inject(AuthLib)
  private readonly cookieService=inject(CookieService)
  private readonly router=inject(Router)

  loading = signal(false);
  user = signal<IUser| null>(null);
  error = signal<string | null>(null);
  isLogged = computed(() => this.user() !== null);


  // login
  login(data:ISignInReq):void{
    this.loading.set(true)
    this.error.set(null)

    this.auth.SignIn(data).pipe(finalize(()=>this.loading.set(false))).subscribe({
      next:(res)=>{ 
        if(res.message==='success'){
          // saving Token to Cookies
          this.cookieService.set('FitnessToken' , res.token , {
            path:'/',
            sameSite:'Strict',
            secure:true
          })

          this.loadUserAfterLogin();

          // should add the toster {WELCOME MESSAGE HERE}
        }
        
        
      },
      error:(err)=>{
        this.error.set(err.error.error || 'Login Failed')
      }
    })
  } 
  
  // load user Data after login
  loadUserAfterLogin(): void {
    this.loading.set(true);
    this.auth.GetLoggedUserData().pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (res) => {
        this.user.set(res);
        this.router.navigate(['/main/home']);
      },
  
      error: () => {
        this.user.set(null);
        this.router.navigate(['/login']);
      }
    });
  }
}
