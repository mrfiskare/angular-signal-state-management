import { Component } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Item } from '../../core/models/item.model';
import { JsonPipe, NgForOf } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    JsonPipe,
    MatCardActions,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss'
})
export class OrderItemsComponent {
  constructor(protected state: StateService) {}

  private readonly item: Item = {
    id: 8,
    name: 'Phone',
    category: 'Electronics',
    price: 800,
    isNew: false
  };

  /**
   * Action to purchase an item.
   * @param {Item} item - The item to purchase.
   */
  purchaseItem(item: Item): void {
    // Trigger purchase action
    this.state.purchaseItem(item);
  }
}
