import { routes } from './../../../../app.routes';
import { Component, inject, signal } from '@angular/core';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CustomButton, RouterLinkActive, RouterLink, NgOptimizedImage, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private readonly _routes = inject(Router);
  isLoggedIn = signal(true);
  isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.update((prev) => !prev);
  }

  goToProfile() {
    this._routes.navigate(['/profile']);
  }
  goToLogin() {
    this._routes.navigate(['/login']);
  }
  goToRegister() {
    this._routes.navigate(['/register']);
  }
}
