import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const noAuthGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('FitnessToken');

  if (!token) {
    return true;
  }

  return router.createUrlTree(['/main/home']);
};
