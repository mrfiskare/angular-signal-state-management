import { Injectable } from '@nestjs/common';
import { Item } from './items.model';

@Injectable()
export class ItemsService {
  // Explicitly type the items array as Item[]
  private initialItems: Item[] = [
    {
      id: 0,
      name: 'Harry Potter',
      category: 'Books',
      price: 10,
      isNew: true,
    },
    {
      id: 1,
      name: 'Toy 1',
      category: 'Toys',
      price: 15,
      isNew: false,
    },
    {
      id: 2,
      name: 'Shirt',
      category: 'Clothes',
      price: 20,
      isNew: true,
    },
    {
      id: 3,
      name: 'Book 2',
      category: 'Books',
      price: 12,
      isNew: false,
    },
    {
      id: 4,
      name: 'Toy 2',
      category: 'Toys',
      price: 18,
      isNew: true,
    },
    {
      id: 5,
      name: 'Pants',
      category: 'Clothes',
      price: 25,
      isNew: false,
    },
    {
      id: 6,
      name: 'Laptop',
      category: 'Electronics',
      price: 1000,
      isNew: true,
    },
    {
      id: 7,
      name: 'MacBook',
      category: 'Electronics',
      price: 800,
      isNew: false,
    },
    {
      id: 8,
      name: 'Jacket',
      category: 'Clothes',
      price: 50,
      isNew: true,
    },
    {
      id: 9,
      name: 'Table',
      category: 'Furniture',
      price: 150,
      isNew: false,
    },
  ];

  // Type the items array explicitly as Item[]
  private items: Item[] = [...this.initialItems];

  constructor() {
    this.items = this.initialItems;
  }

  getItems(): Item[] {
    // Make sure the return type is always Item[]
    return this.items;
  }

  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === +id);
  }

  addItem(newItem: Item): void {
    this.items.push(newItem);
  }

  updateItem(id: number, updatedItem: Item): void {
    const index = this.items.findIndex((item) => item.id === +id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }

  deleteItem(id: number): void {
    const idNum = +id;
    console.log(idNum);
    this.items = this.items.filter((item) => item.id !== idNum);
    this.recalculateIds();
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
    this.recalculateIds();
    return item;
  }

  /**
   * Clear all purchased items.
   */
  clearPurchasedItems(): void {
    this.purchasedItems = [];
  }

  /**
   * Recalculate the IDs of all items to ensure they are sequential.
   */
  private recalculateIds(): void {
    this.items = this.items.map((item, index) => ({
      ...item,
      id: index + 1, // Reassign id starting from 1
    }));
  }
}
