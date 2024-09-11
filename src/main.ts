import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './core/components/app/app.config';
import { AppComponent } from './core/components/app/app.component';
import { logger } from './core/services/logger.service';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => logger.warn(err));
