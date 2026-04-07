import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'forget-pass',
    loadComponent: () =>
      import('../features/auth/forget-pass/forget-pass').then(
        (m) => m.ForgetPass
      ),
  },
  {
    path: 'user-info',
    loadComponent: () =>
      import('../features/auth/user-info/user-info').then((m) => m.UserInfo),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../features/auth/profile/profile').then((m) => m.Profile),
  },
];
