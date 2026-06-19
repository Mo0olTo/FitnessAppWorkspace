import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import Aura from '@primeuix/themes/aura';
import { API_URL, AuthLib, authAPI } from 'auth-lib';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { headersInterceptor } from './core/interceptors/headers/headers-interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { AuthFacade } from './features/auth/auth-facade/auth-facade';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    AuthLib,
    {
      provide: API_URL,
      useValue: environment.apiBaseUrl,
    },
    {
      provide: authAPI,
      useExisting: AuthLib,
    },

    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor])),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor])),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
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
    {
      provide: APP_INITIALIZER,
      useFactory: (authFacade: AuthFacade) => () => authFacade.checkAuthStatus(),
      deps: [AuthFacade],
      multi: true,
    },
  ],
};
