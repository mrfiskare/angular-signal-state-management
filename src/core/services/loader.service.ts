import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private logger: LoggerService) {}

  public showLoader() {
    this.resetCounterIfNeeded();
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
    this.logger.log('[showLoader] API count: ', this.apiCount);
  }

  public hideLoader() {
    this.apiCount--;
    this.resetCounterIfNeeded();
    this.logger.log('[hideLoader] API count: ', this.apiCount);
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }

  private resetCounterIfNeeded() {
    if (this.apiCount < 0) {
      this.apiCount = 0;
    }
  }
}
