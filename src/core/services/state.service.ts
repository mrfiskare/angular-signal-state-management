import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './item.service';
import { GlobalState } from '../models/state.model';
import { Item } from '../models/item.model';
import { Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // ---------------------------------------
  // Services
  // ---------------------------------------
  private http = inject(HttpClient);
  private itemService = inject(ItemService);

  // ---------------------------------------
  // State
  // ---------------------------------------
  private state = signal<GlobalState>({
    isLoading: false,
    availableItems: [] as Item[],
    purchasedItems: [] as Item[]
  });

  constructor() {}

  // ---------------------------------------
  // State Selectors (like Redux selectors)
  // ---------------------------------------

  public isLoading = computed(() => this.state().isLoading);
  public availableItems = computed(() => this.state().availableItems);
  public purchasedItems = computed(() => this.state().purchasedItems);

  // ---------------------------------------
  // Actions (Like NGRX Actions)
  // ---------------------------------------

  /**
   * Trigger action to load available items from the API.
   * @effect
   */
  loadAvailableItems(): void {
    this.setLoading(true);
    this.itemService
      .getItems()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (items: Item[]) => {
          this.setAvailableItems(items); // Reducer
          this.setLoading(false);
        },
        error: () => this.setLoading(false)
      });
  }

  /**
   * Trigger action to load purchased items from the API.
   * @effect
   */
  loadPurchasedItems(): void {
    this.setLoading(true);
    this.itemService
      .getPurchasedItems()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (items: Item[]) => {
          this.setPurchasedItems(items); // Reducer
          this.setLoading(false);
        },
        error: () => this.setLoading(false)
      });
  }

  /**
   * Trigger action to add a purchased item via the API and reload item lists.
   * @param {Item} item - The item to purchase.
   * @effect
   */
  purchaseItem(item: Item): void {
    this.setLoading(true);
    this.itemService
      .addPurchasedItem(item)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          // After the purchase, reload the available items and purchased items from the server
          this.loadAvailableItems(); // Effect
          this.loadPurchasedItems(); // Effect
          this.setLoading(false);
        },
        error: () => this.setLoading(false)
      });
  }

  /**
   * Trigger action to clear all purchased items via the API.
   * @effect
   */
  clearPurchasedItems(): void {
    this.setLoading(true);
    this.itemService
      .clearPurchasedItems()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          // After clearing, reload the purchased items from the server
          this.loadPurchasedItems(); // Effect
          this.setLoading(false);
        },
        error: () => this.setLoading(false)
      });
  }

  /**
   * Reset the global state and API data.
   * @effect
   */
  resetState(): void {
    this.setLoading(true);

    // Clear purchased items from the server
    this.itemService
      .clearPurchasedItems()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          // Reset available items on the server
          this.itemService
            .resetItems()
            .pipe(takeUntilDestroyed())
            .subscribe({
              next: () => {
                // Reset local state after successful API calls
                this.setAvailableItems([]); // Clear local available items
                this.setPurchasedItems([]); // Clear local purchased items
                this.loadAvailableItems(); // Effect
                this.loadPurchasedItems(); // Effect
                this.setLoading(false);
              },
              error: () => this.setLoading(false)
            });
        },
        error: () => this.setLoading(false)
      });
  }

  // ---------------------------------------
  // Reducers (like NGRX reducers)
  // ---------------------------------------

  /**
   * Reducer to update the loading state.
   * @param {boolean} isLoading - The new loading state.
   */
  private setLoading(isLoading: boolean): void {
    this.state.update((state) => ({
      ...state,
      isLoading
    }));
  }

  /**
   * Reducer to set the available items in the global state.
   * @param {Item[]} items - The new available items.
   */
  private setAvailableItems(items: Item[]): void {
    this.state.update((state) => ({
      ...state,
      availableItems: items
    }));
  }

  /**
   * Reducer to set the purchased items in the global state.
   * @param {Item[]} items - The new purchased items.
   */
  private setPurchasedItems(items: Item[]): void {
    this.state.update((state) => ({
      ...state,
      purchasedItems: items
    }));
  }
}
