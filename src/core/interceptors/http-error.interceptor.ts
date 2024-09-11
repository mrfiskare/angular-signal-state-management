import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { GlobalErrorHandlerService } from '../services/global-error-handler.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler = inject(GlobalErrorHandlerService);

  return next(req).pipe(
    catchError((error) => {
      errorHandler.handleError(error);
      return throwError(() => error);
    })
  );
};
