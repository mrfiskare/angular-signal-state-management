import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal
} from '@angular/core';
import { ItemService } from './item.service';
import { GlobalState } from '../models/state.model';
import { Item } from '../models/item.model';
import { LoaderService } from './loader.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private destroyRef = inject(DestroyRef);
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
    this.itemService
      .getItems()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items: Item[]) => {
          this.setAvailableItems(items); // Reducer
          setTimeout(() => {
            this.loaderService.hideLoader();
          }, 1000);
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
    this.itemService
      .getPurchasedItems()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items: Item[]) => {
          this.setPurchasedItems(items); // Reducer
          setTimeout(() => {
            this.loaderService.hideLoader();
          }, 1000);
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
    this.itemService
      .addPurchasedItem(item)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // After the purchase, reload the available items and purchased items from the server
          this.loadAvailableItems(); // Effect
          this.loadPurchasedItems(); // Effect
          setTimeout(() => {
            this.loaderService.hideLoader();
          }, 1000);
        },
        error: () => this.loaderService.hideLoader()
      });
  }

  /**
   * Trigger action to add a new available item via the API and reload item lists.
   * @param {Item} item - The item to add.
   * @effect
   */
  addNewAvailableItem(item: Item): void {
    this.loaderService.showLoader();
    this.itemService
      .addItem(item)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // After adding the new item, reload the available items from the server
          this.loadAvailableItems(); // Effect
          setTimeout(() => {
            this.loaderService.hideLoader();
          }, 1000);
        },
        error: () => this.loaderService.hideLoader()
      });
  }

  /**
   * Trigger action to delete an available item via the API and reload item lists.
   * @param {number} id - The id of the item to delete.
   * @effect
   */
  deleteAvailableItem(id: number): void {
    this.loaderService.showLoader();
    this.itemService
      .deleteItem(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // After adding deleting the item, reload the available items from the server
          this.loadAvailableItems(); // Effect
          setTimeout(() => {
            this.loaderService.hideLoader();
          }, 1000);
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

      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // After clearing, reload the purchased items from the server
          this.loadPurchasedItems(); // Effect
          setTimeout(() => {
            this.loaderService.hideLoader();
          }, 1000);
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

      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // Reset available items on the server
          this.itemService
            .resetItems()

            .pipe(takeUntilDestroyed(this.destroyRef))
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
                setTimeout(() => {
                  this.loaderService.hideLoader();
                }, 1000);
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
