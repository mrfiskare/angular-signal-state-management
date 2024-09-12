import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
    protected state: StateService
  ) {}

  navigateTo(route: string): void {
    void this.router.navigate([route]);
  }
}
