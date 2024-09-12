import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { HomeRedirectDialogComponent } from '../../dialogs/home-redirect-dialog/home-redirect-dialog.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    NgOptimizedImage,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  @Output() toggleSidenav = new EventEmitter<void>();

  protected userService = { userName: 'User service missing' };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    protected state: StateService
  ) {}

  public ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  protected onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  public async redirectToHome() {
    if (this.router.url !== '/home') {
      const dialogRef = this.dialog.open(HomeRedirectDialogComponent, {
        autoFocus: false,
        restoreFocus: false
      });

      dialogRef
        .afterClosed()
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(async (result) => {
          if (result === true) {
            await this.router.navigateByUrl('/');
          }
        });
    } else {
      this.snackBar.open('You are on the home page', 'Close', {
        duration: 3000
      });
    }
  }
}
