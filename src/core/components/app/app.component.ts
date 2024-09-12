import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { HeaderComponent } from '../header/header.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatDivider,
    MatAnchor,
    MatCheckbox,
    MatLabel,
    MatFormField,
    MatCardContent,
    MatCard,
    MatInput,
    HeaderComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatIcon,
    NgIf,
    AsyncPipe,
    MatMenu,
    MatMenuItem,
    NgForOf,
    MatMenuTrigger,
    SpinnerComponent,
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'signal-client';
  @ViewChild('sidenav') sidenav: MatSidenav = {} as MatSidenav;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent =
    {} as HeaderComponent;

  constructor(protected state: StateService) {}

  ngOnInit() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  protected async onResize(width: number) {
    const bootstrapMdBreakpoint = 768;
    if (width >= bootstrapMdBreakpoint && this.sidenav.opened) {
      await this.sidenav.close();
    }
  }

  protected async callRedirectToHome() {
    await this.sidenav.close().then(() => {
      this.headerComponent.redirectToHome();
    });
  }
}
