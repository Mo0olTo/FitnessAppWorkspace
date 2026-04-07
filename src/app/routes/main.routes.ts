import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('../features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../features/about/about').then((m) => m.About),
  },
  {
    path: 'classes',
    loadComponent: () =>
      import('../features/classes/classes').then((m) => m.Classes),
  },
  {
    path: 'healthy',
    loadComponent: () =>
      import('../features/healthy/healthy').then((m) => m.Healthy),
  },
  {
    path: 'ai-assistant',
    loadComponent: () =>
      import('../features/ai-assistant/ai-assistant').then(
        (m) => m.AiAssistant
      ),
  },
];
