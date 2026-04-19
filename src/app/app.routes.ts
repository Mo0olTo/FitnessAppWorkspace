import { Routes } from '@angular/router';
import { Auth } from './layouts/auth/auth';
import { Main } from './layouts/main/main';
import { authRoutes } from './routes/auth.routes';

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
    children: authRoutes,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
