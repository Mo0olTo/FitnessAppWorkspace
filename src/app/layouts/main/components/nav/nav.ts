import { routes } from './../../../../app.routes';
import { Component, inject, signal } from '@angular/core';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthFacade } from '../../../../features/auth/auth-facade/auth-facade';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  imports: [
    CustomButton,
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly _routes = inject(Router);
  readonly _auth = inject(AuthFacade);
  readonly isLoggedIn = this._auth.isLogged;
  readonly isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.update((prev) => !prev);
  }

  goToLogin() {
    this._routes.navigate(['auth/login']);
  }
  goToRegister() {
    this._routes.navigate(['/register']);
  }
}
