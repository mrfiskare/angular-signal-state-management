import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinner, AsyncPipe, NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}
