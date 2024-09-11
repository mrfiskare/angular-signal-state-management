import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

/* eslint 'no-console': 'off' */
export class LoggerService {
  warn = console.warn.bind(console.warn);
  log = console.log.bind(console.log);
  debug = console.log.bind(console.debug);
  info = console.log.bind(console.info);

  disableConsoleInProduction(): void {
    if (environment.production) {
      console.warn(`Console output is disabled on production!`);
      logger.log = function (): void {
        return;
      };
      console.log = function (): void {
        return;
      };
      console.debug = function (): void {
        return;
      };
      console.warn = function (): void {
        return;
      };
      console.info = function (): void {
        return;
      };
    }
  }
}

export const logger = new LoggerService();
