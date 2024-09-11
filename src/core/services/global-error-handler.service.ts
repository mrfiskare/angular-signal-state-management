import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    const snackBar = this.injector.get(MatSnackBar);

    // Handling HTTP Errors

    if (error instanceof HttpErrorResponse) {
      snackBar.open('Network error', 'Close', {
        duration: 5000
      });
    } else {
      // Handling client-side errors

      snackBar.open('An error occurred', 'Close', {
        duration: 5000
      });
    }

    logger.log('[GlobalErrorHandler] 🚨 error:', error);
  }
}
