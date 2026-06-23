import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { IChangePassReq } from 'auth-lib';
import { ReusableInput } from '../../components/reusable-input/reusable-input';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeFacade } from '../../../../core/Theme/theme.facade';
import { MyTranslate } from '../../../../core/Services/Transilation/my-translate';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    Toast,
    ReactiveFormsModule,
    ReusableInput,
    TranslatePipe,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly fb = inject(FormBuilder);
  private readonly themefacede = inject(ThemeFacade);
  public readonly translateService = inject(MyTranslate);
  isDark = signal(this.themefacede.isDark);

  readonly goal = this.authFacade.goal;
  readonly activityLevel = this.authFacade.activityLevel;
  readonly weight = this.authFacade.weight;
  readonly visible = signal<boolean>(false);
  readonly logoutVisible = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  changePasswordForm!: FormGroup;

  toggle() {
    // this.isDark.update((v) => !v);
    this.themefacede.toggleTheme();
  }

  readonly profileMetrics = [
    { label: 'profile.settingItems.goal', signal: this.goal },
    { label: 'profile.settingItems.level', signal: this.activityLevel },
    { label: 'profile.settingItems.weight', signal: this.weight },
  ];
  settingItems = computed(() => [
    {
      title: 'Change Password',
      icon: 'pi pi-refresh',
      action: () => this.openChangePasswordModal(),
    },
    {
      title: 'Select Language',
      icon: 'pi pi-globe',
      subtitle: this.translateService.currentLang() === 'en' ? 'English' : 'العربية',
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
    { title: 'Logout', icon: 'pi pi-sign-out', action: () => this.openLogoutModel() },
  ]);
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
    const current = this.translateService.currentLang();
    const nextLang = current === 'en' ? 'ar' : 'en';
    this.translateService.switchLang(nextLang);
  }
  toggleTheme() {
    this.toggle();
  }
  openLogoutModel() {
    this.logoutVisible.set(true);
  }
  onLogout() {
    console.log('Logout trigger');
    this.authFacade.logout();
  }
  closeLogoutDialog() {
    this.logoutVisible.set(false);
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
