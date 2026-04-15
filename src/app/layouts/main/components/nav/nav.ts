import { Component } from '@angular/core';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CustomButton, RouterLinkActive, RouterLink, NgOptimizedImage],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {}
