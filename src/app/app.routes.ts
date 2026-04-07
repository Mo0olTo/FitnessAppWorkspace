import { Routes } from '@angular/router';
import { Auth } from './layouts/auth/auth';
import { Main } from './layouts/main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    loadChildren: () =>
      import('./routes/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: 'auth',
    component: Auth,
    loadChildren: () =>
      import('./routes/auth.routes').then((m) => m.authRoutes),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
