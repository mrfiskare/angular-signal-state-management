import { computed, inject, Injectable, signal } from '@angular/core';
import { ItemService } from './item.service';
import { GlobalState } from '../models/state.model';
import { Item } from '../models/item.model';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // ---------------------------------------
  // Services
  // ---------------------------------------
  private itemService = inject(ItemService);

  // ---------------------------------------
  // State
  // ---------------------------------------
  private state = signal<GlobalState>({
    isLoading: false,
    availableItems: [] as Item[],
    purchasedItems: [] as Item[],
    localOnlyData: ''
  });

  constructor(private loaderService: LoaderService) {
    this.loadAvailableItems();
  }

  // ---------------------------------------
  // State Selectors (like Redux selectors)
  // ---------------------------------------

  public isLoading = computed(() => this.state().isLoading);
  public availableItems = computed(() => this.state().availableItems);
  public purchasedItems = computed(() => this.state().purchasedItems);
  public localOnlyData = computed(() => this.state().localOnlyData);
  public moneySpent = computed(() => {
    let sum = 0;
    for (const item of this.state().purchasedItems) {
      sum += item.price;
    }
    return sum;
  });

  // ---------------------------------------
  // Actions (Like NGRX Actions)
  // ---------------------------------------

  /**
   * Trigger action to load available items from the API.
   * @effect
   */
  loadAvailableItems(): void {
    this.loaderService.showLoader();
    this.itemService.getItems().subscribe({
      next: (items: Item[]) => {
        this.setAvailableItems(items); // Reducer
        this.loaderService.hideLoader();
      },
      error: () => this.loaderService.hideLoader()
    });
  }

  /**
   * Trigger action to load purchased items from the API.
   * @effect
   */
  loadPurchasedItems(): void {
    this.loaderService.showLoader();
    this.itemService.getPurchasedItems().subscribe({
      next: (items: Item[]) => {
        this.setPurchasedItems(items); // Reducer
        this.loaderService.hideLoader();
      },
      error: () => this.loaderService.hideLoader()
    });
  }

  /**
   * Trigger action to add a purchased item via the API and reload item lists.
   * @param {Item} item - The item to purchase.
   * @effect
   */
  purchaseItem(item: Item): void {
    this.loaderService.showLoader();
    this.itemService.addPurchasedItem(item).subscribe({
      next: () => {
        // After the purchase, reload the available items and purchased items from the server
        this.loadAvailableItems(); // Effect
        this.loadPurchasedItems(); // Effect
        this.loaderService.hideLoader();
      },
      error: () => this.loaderService.hideLoader()
    });
  }

  /**
   * Trigger action to clear all purchased items via the API.
   * @effect
   */
  clearPurchasedItems(): void {
    this.loaderService.showLoader();
    this.itemService
      .clearPurchasedItems()

      .subscribe({
        next: () => {
          // After clearing, reload the purchased items from the server
          this.loadPurchasedItems(); // Effect
          this.loaderService.hideLoader();
        },
        error: () => this.loaderService.hideLoader()
      });
  }

  /**
   * Reset the global state and API data.
   * @effect
   */
  resetState(): void {
    this.loaderService.showLoader();

    // Clear purchased items from the server
    this.itemService
      .clearPurchasedItems()

      .subscribe({
        next: () => {
          // Reset available items on the server
          this.itemService
            .resetItems()

            .subscribe({
              next: () => {
                // Reset local state after successful API calls
                this.setAvailableItems([] as Item[]); // Clear local available items
                this.setPurchasedItems([] as Item[]); // Clear local purchased items
                this.loadAvailableItems(); // Effect
                this.loadPurchasedItems(); // Effect

                // Reset the local only data
                this.setLocalOnlyData('');

                // Hide the loader
                this.loaderService.hideLoader();
              },
              error: () => this.loaderService.hideLoader()
            });
        },
        error: () => this.loaderService.hideLoader()
      });
  }

  // ---------------------------------------
  // Reducers (like NGRX reducers)
  // ---------------------------------------

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

  /**
   * Reducer to set the local only data in the global state.
   * @param {string} data - The new local only data.
   */
  private setLocalOnlyData(data: string): void {
    this.state.update((state) => ({
      ...state,
      localOnlyData: data
    }));
  }
}
