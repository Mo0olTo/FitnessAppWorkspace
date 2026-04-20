import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';


type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class Darkmode { 
 

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

   //Signal holds current theme
  private theme = signal<Theme>('light');

  // expose readonly
  currentTheme = this.theme.asReadonly();

  constructor() {
    this.initTheme();
    this.listenToSystemTheme();
    
    //effect: runs automatically when theme changes
    effect(() => {
       if (!this.isBrowser) return;
      const value = this.theme();

      document.body.classList.toggle('dark', value === 'dark');
      localStorage.setItem('theme', value);
    });
  }

  //initialize theme
  private initTheme() {
     if (!this.isBrowser) return;
     const saved = localStorage.getItem('theme') as Theme | null;

    if (saved) {
      this.theme.set(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(prefersDark ? 'dark' : 'light');
    }
  }

  //toggle
  toggleTheme() {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  //set manually
  setTheme(theme: Theme) {
    this.theme.set(theme);
  }


   listenToSystemTheme() {
  if (!this.isBrowser) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');

  media.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      this.theme.set(e.matches ? 'dark' : 'light');
    }
  });
}
  
}
