import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MyTranslate } from '../../Services/Transilation/my-translate';
import { catchError, throwError } from 'rxjs';

export const translationInterceptor: HttpInterceptorFn = (req, next) => {
  const myTranslateService = inject(MyTranslate);

  // 1. Get the current language from the Signal
  const currentLang = myTranslateService.currentLang() || 'en';

  // 2. Clone the request and append the 'accept-language' header
  const modifiedReq = req.clone({
    setHeaders: {
      'accept-language': currentLang,
    },
  });

  // 3. Handle the request pipeline and catching errors
  return next(modifiedReq).pipe(
    // 4. Global HTTP Error Handling
    catchError((error: HttpErrorResponse) => {
      console.error('[Translation Interceptor]: HTTP Request Failed');
      console.error(`Status Code: ${error.status}`);
      console.error(`Error Message: ${error.message}`);

      switch (error.status) {
        case 401:
          console.warn('Unauthorized access - Redirecting or clearing session might be needed.');
          break;
        case 403:
          console.warn('Forbidden - You do not have permission to access this resource.');
          break;
        case 404:
          console.warn('Not Found - The requested endpoint does not exist.');
          break;
        case 500:
          console.warn('Internal Server Error - Something went wrong on the server.');
          break;
        default:
          console.warn('Unexpected network or client error occurred.');
      }

      return throwError(() => error);
    }),
  );
};
