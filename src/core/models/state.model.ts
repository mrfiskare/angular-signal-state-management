import { Item } from './item.model';

export interface GlobalState {
  isLoading: boolean;
  availableItems: Item[];
  purchasedItems: Item[];
}
