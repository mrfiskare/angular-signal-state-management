import { Item } from './item.model';

export interface StateModel {
  isLoading: boolean;
  availableItems: Item[];
}
