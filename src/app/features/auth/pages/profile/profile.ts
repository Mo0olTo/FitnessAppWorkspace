import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { IChangePassReq } from 'auth-lib';
import { ReusableInput } from '../../components/reusable-input/reusable-input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, Toast, ReactiveFormsModule, ReusableInput],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  readonly goal = this.authFacade.goal;
  readonly activityLevel = this.authFacade.activityLevel;
  readonly weight = this.authFacade.weight;
  readonly visible = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  changePasswordForm!: FormGroup;

  readonly profileMetrics = [
    { label: 'Your Goal', signal: this.goal },
    { label: 'Level', signal: this.activityLevel },
    { label: 'Weight', signal: this.weight },
  ];
  readonly settingItems = [
    {
      title: 'Change Password',
      icon: 'pi pi-refresh',
      action: () => this.openChangePasswordModal(),
    },
    {
      title: 'Select Language',
      icon: 'pi pi-globe',
      subtitle: 'English',
      action: () => this.toggleLanguage(),
    },
    {
      title: 'Mood',
      icon: 'pi pi-moon',
      subtitle: 'Dark',
      hasToggle: true,
      action: () => this.toggleTheme(),
    },
    { title: 'Security', icon: 'pi pi-lock' },
    { title: 'Privacy Policy', icon: 'pi pi-shield' },
    { title: 'Help', icon: 'pi pi-question-circle' },
    { title: 'Logout', icon: 'pi pi-sign-out', action: () => this.logout() },
  ];
  ngOnInit(): void {
    this.authFacade.loadUserAfterLogin();
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/),
        ],
      ],
    });
  }

  openChangePasswordModal() {
    this.visible.set(true);
    console.log('Password trigger');
  }
  toggleLanguage() {
    console.log('Language trigger');
  }
  toggleTheme() {
    console.log('Theme trigger');
  }
  logout() {
    console.log('Logout trigger');
  }

  closeDialog() {
    this.visible.set(false);
    this.changePasswordForm.reset;
  }

  get currentPasswordControl() {
    return this.changePasswordForm.get('password');
  }

  get newPasswordControl() {
    return this.changePasswordForm.get('newPassword');
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const payload: IChangePassReq = this.changePasswordForm.getRawValue();
    this.authFacade.changePassword(payload).subscribe({
      next: () => {
        this.closeDialog();
        this.isSubmitting.set(false);
        this.changePasswordForm.reset();
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
