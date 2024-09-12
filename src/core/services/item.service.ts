import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/items';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Constructor to inject HttpClient service.
   * @param {HttpClient} http - The Angular HTTP client used for making API calls.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetch all available items from the API.
   * @returns {Observable<Item[]>} Observable stream of items.
   */
  public getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  /**
   * Fetch a single item by its ID.
   * @param {number} id - The ID of the item to fetch.
   * @returns {Observable<Item>} Observable stream of the fetched item.
   */
  public getItemById(id: number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  /**
   * Add a new item to the list of available items.
   * @param {Item} item - The item to be added.
   * @returns {Observable<Item>} Observable stream of the added item.
   */
  public addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, this.httpOptions);
  }

  /**
   * Update an existing item by its ID.
   * @param {number} id - The ID of the item to update.
   * @param {Item} item - The updated item data.
   * @returns {Observable<void>} Observable for the completion of the update operation.
   */
  public updateItem(id: number, item: Item): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, item, this.httpOptions);
  }

  /**
   * Delete an item by its ID.
   * @param {number} id - The ID of the item to delete.
   * @returns {Observable<void>} Observable for the completion of the delete operation.
   */
  public deleteItem(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

  /**
   * Reset all items to their initial state (server-side).
   * @returns {Observable<void>} Observable for the completion of the reset operation.
   */
  public resetItems(): Observable<void> {
    const url = `${this.apiUrl}/reset`;
    return this.http.post<void>(url, {}, this.httpOptions);
  }

  /**
   * Get the list of purchased items from the API.
   * @returns {Observable<Item[]>} Observable stream of purchased items.
   */
  getPurchasedItems(): Observable<Item[]> {
    const url = `${this.apiUrl}/purchased`;
    return this.http.get<Item[]>(url);
  }

  /**
   * Add a new purchased item to the API.
   * @param {Item} item - The item to be purchased.
   * @returns {Observable<Item>} Observable stream of the purchased item.
   */
  addPurchasedItem(item: Item): Observable<Item> {
    const url = `${this.apiUrl}/purchased`;
    return this.http.post<Item>(url, item, this.httpOptions);
  }

  /**
   * Clear the list of purchased items in the API.
   * @returns {Observable<void>} Observable for the clear action.
   */
  clearPurchasedItems(): Observable<void> {
    const url = `${this.apiUrl}/purchased`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
