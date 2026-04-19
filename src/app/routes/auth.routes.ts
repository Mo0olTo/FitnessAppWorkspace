import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', title: 'Login',
    loadComponent: () =>
      import('../features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',   title: 'Register',
    loadComponent: () =>
      import('../features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'forget-pass', title: 'Forget Password',
    loadComponent: () =>
      import('../features/auth/forget-pass/forget-pass').then(
        (m) => m.ForgetPass
      ),
  },
  {
    path: 'user-info', title: 'User Information',
    loadComponent: () =>
      import('../features/auth/user-info/user-info').then((m) => m.UserInfo),
  },
  {
    path: 'profile',  title: 'Profile',
    loadComponent: () =>
      import('../features/auth/profile/profile').then((m) => m.Profile),
  },
];
