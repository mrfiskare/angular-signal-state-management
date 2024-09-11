import { Routes } from '@angular/router';
import { HomeComponent } from '../../../pages/home/home.component';

export const routes: Routes = [
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
