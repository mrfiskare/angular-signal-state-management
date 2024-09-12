import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { NgForOf } from '@angular/common';
import { Item } from '../../core/models/item.model';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-manage-available-items',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
    MatButton,
    MatCardActions,
    MatList,
    MatListItem,
    NgForOf,
    MatLabel
  ],
  templateUrl: './manage-available-items.component.html',
  styleUrl: './manage-available-items.component.scss'
})
export class ManageAvailableItemsComponent {
  protected itemForm;

  constructor(
    protected state: StateService,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      id: [0, Validators.required], // Initial value 0, required
      name: ['', Validators.required], // Empty string, required
      category: ['', Validators.required], // Empty string, required
      price: [0, [Validators.required, Validators.min(0)]], // Initial price 0, minimum value 0
      isNew: [false] // Default value false
    });
  }

  onAddItem(): void {
    if (this.itemForm.valid) {
      const newItem: Item = this.itemForm.value as Item;
      newItem.id = this.state.availableItems().length + 1;
      this.state.addNewAvailableItem(newItem);
    }
  }

  findItemByName(name: string): Item | undefined {
    return this.state
      .availableItems()
      .find((item) => item.name.toLowerCase() === name.toLowerCase());
  }

  // This is buggy, deletes duplicates as well
  onDeleteItem(name: string) {
    this.state.deleteAvailableItem(this.findItemByName(name)?.id as number);
  }
}
