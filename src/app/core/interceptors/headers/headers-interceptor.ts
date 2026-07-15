import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(CookieService);
  const token = cookie.get('FitnessToken');

  if (req.url.includes('themealdb.com')) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
