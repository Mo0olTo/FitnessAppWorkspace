import { Routes } from '@angular/router';
import { Auth } from './layouts/auth/auth';
import { Main } from './layouts/main/main';
import { authRoutes } from './routes/auth.routes';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    canActivate: [authGuard],
    loadChildren: () => import('./routes/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: 'auth',
    component: Auth,
    children: authRoutes,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
