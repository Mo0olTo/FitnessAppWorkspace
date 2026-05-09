import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { noAuthGuard } from '../core/guards/no-auth.guard';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    title: 'Login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('../features/auth/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    title: 'Register',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('../features/auth/pages/register/register').then((m) => m.Register),
  },
  {
    path: 'forget-pass',
    title: 'Forget Password',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('../features/auth/pages/forget-pass/forget-pass').then(
        (m) => m.ForgetPass
      ),
  },
  {
    path: 'user-info',
    title: 'User Information',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../features/auth/pages/user-info/user-info').then((m) => m.UserInfo),
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../features/auth/pages/profile/profile').then((m) => m.Profile),
  },
];
