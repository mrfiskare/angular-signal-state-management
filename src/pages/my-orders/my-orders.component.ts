import { Component } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
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
  selector: 'app-my-orders',
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
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  constructor(protected state: StateService) {}
}
