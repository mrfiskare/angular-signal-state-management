import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home-redirect-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './home-redirect-dialog.component.html',
  styleUrl: './home-redirect-dialog.component.scss'
})
export class HomeRedirectDialogComponent {
  readonly dialogRef = inject(MatDialogRef<HomeRedirectDialogComponent>);

  protected onNoClick(): void {
    this.dialogRef.close();
  }
}
