import { Routes } from '@angular/router';
import { HomeComponent } from '../../../pages/home/home.component';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: HomeComponent },
  {
    path: 'new-order',
    title: 'New Order',
    loadComponent: () =>
      import('../../../pages/order-items/order-items.component').then(
        (m) => m.OrderItemsComponent
      )
  },
  {
    path: 'my-orders',
    title: 'My Orders',
    loadComponent: () =>
      import('../../../pages/my-orders/my-orders.component').then(
        (m) => m.MyOrdersComponent
      )
  },
  {
    path: 'summary',
    title: 'Summary',
    loadComponent: () =>
      import('../../../pages/summary/summary.component').then(
        (m) => m.SummaryComponent
      )
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
