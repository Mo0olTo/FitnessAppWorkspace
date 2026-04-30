import { API_URL, AuthLib, authAPI } from 'auth-lib';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    {
      provide: API_URL,
      useValue: environment.apiBaseUrl,
    },
    {
      provide: authAPI,
      useExisting: AuthLib,
    },
    
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor,])),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    CookieService,
    MessageService,
    
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};
