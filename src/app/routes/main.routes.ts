import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

export const mainRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('../features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('../features/about/about').then((m) => m.About),
  },
  {
    path: 'classes',
    title: 'Classes',
    loadComponent: () => import('../features/classes/classes').then((m) => m.Classes),
  },
  {
    path: 'healthy',
    title: 'Healthy',
    loadComponent: () => import('../features/healthy/healthy').then((m) => m.Healthy),
  },
  {
    path: 'ai-assistant',
    title: 'AI Assistant',
    loadComponent: () => import('../features/ai-assistant/ai-assistant').then((m) => m.AiAssistant),
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [authGuard],
    loadComponent: () => import('../features/auth/pages/profile/profile').then((m) => m.Profile),
  },
];
