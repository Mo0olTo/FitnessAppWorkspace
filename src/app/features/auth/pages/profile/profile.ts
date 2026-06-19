import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../auth-facade/auth-facade';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private readonly router = inject(Router);
  private readonly authFacade = inject(AuthFacade);
  readonly goal = this.authFacade.goal;
  readonly activityLevel = this.authFacade.activityLevel;
  readonly weight = this.authFacade.weight;

  readonly profileMetrics = [
    { label: 'Your Goal', signal: this.goal },
    { label: 'Level', signal: this.activityLevel },
    { label: 'Weight', signal: this.weight },
  ];
  settingItems = [
    { title: 'Change Password', icon: 'pi pi-refresh' },
    { title: 'Select Language', icon: 'pi pi-globe', subtitle: 'English' },
    { title: 'Mood', icon: 'pi pi-moon', subtitle: 'Dark', hasToggle: true },
    { title: 'Security', icon: 'pi pi-lock' },
    { title: 'Privacy Policy', icon: 'pi pi-shield' },
    { title: 'Help', icon: 'pi pi-question-circle' },
    { title: 'Logout', icon: 'pi pi-sign-out' },
  ];
  ngOnInit(): void {
    this.authFacade.loadUserAfterLogin();
  }
}
