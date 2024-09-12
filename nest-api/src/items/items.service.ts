import { Injectable } from '@nestjs/common';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  // Explicitly type the items array as Item[]
  private initialItems: Item[] = [
    {
      id: 1,
      name: 'Book 1',
      category: 'Books',
      price: 10,
      count: 5,
      isNew: true,
    },
    {
      id: 2,
      name: 'Toy 1',
      category: 'Toys',
      price: 15,
      count: 3,
      isNew: false,
    },
    {
      id: 3,
      name: 'Shirt',
      category: 'Clothes',
      price: 20,
      count: 10,
      isNew: true,
    },
    {
      id: 4,
      name: 'Book 2',
      category: 'Books',
      price: 12,
      count: 4,
      isNew: false,
    },
    {
      id: 5,
      name: 'Toy 2',
      category: 'Toys',
      price: 18,
      count: 7,
      isNew: true,
    },
    {
      id: 6,
      name: 'Pants',
      category: 'Clothes',
      price: 25,
      count: 6,
      isNew: false,
    },
    {
      id: 7,
      name: 'Laptop',
      category: 'Electronics',
      price: 1000,
      count: 2,
      isNew: true,
    },
    {
      id: 8,
      name: 'Phone',
      category: 'Electronics',
      price: 800,
      count: 3,
      isNew: false,
    },
    {
      id: 9,
      name: 'Jacket',
      category: 'Clothes',
      price: 50,
      count: 8,
      isNew: true,
    },
    {
      id: 10,
      name: 'Table',
      category: 'Furniture',
      price: 150,
      count: 1,
      isNew: false,
    },
  ];

  // Type the items array explicitly as Item[]
  private items: Item[] = [...this.initialItems];

  getItems(): Item[] {
    // Make sure the return type is always Item[]
    return this.items;
  }

  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }

  addItem(newItem: Item): void {
    this.items.push(newItem);
  }

  updateItem(id: number, updatedItem: Item): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  resetItems(): void {
    this.items = [...this.initialItems];
  }

  private purchasedItems: Item[] = [];

  /**
   * Get all purchased items.
   * @returns {Item[]} Array of purchased items.
   */
  getPurchasedItems(): Item[] {
    return this.purchasedItems;
  }

  /**
   * Add an item to the purchased items list.
   * @param {Item} item - The item to add to purchased items.
   * @returns {Item} The added item.
   */
  addPurchasedItem(item: Item): Item {
    this.purchasedItems.push(item);
    return item;
  }

  /**
   * Clear all purchased items.
   */
  clearPurchasedItems(): void {
    this.purchasedItems = [];
  }
}
