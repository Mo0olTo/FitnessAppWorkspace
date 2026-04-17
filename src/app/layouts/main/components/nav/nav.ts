import { Component, signal } from '@angular/core';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CustomButton, RouterLinkActive, RouterLink, NgOptimizedImage, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.update((prev) => !prev);
  }
}
