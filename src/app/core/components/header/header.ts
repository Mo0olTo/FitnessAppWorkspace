import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CustomButton, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
