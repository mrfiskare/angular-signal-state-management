import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Services
  private http = inject(HttpClient);
  private items = inject(ItemService);

  // State
  private state;

  constructor() {}
}
