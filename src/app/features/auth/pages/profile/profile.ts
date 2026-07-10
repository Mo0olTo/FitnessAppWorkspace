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
import { IChangePassReq, IEditReq } from 'auth-lib';
import { ReusableInput } from '../../components/reusable-input/reusable-input';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeFacade } from '../../../../core/Theme/theme.facade';
import { MyTranslate } from '../../../../core/Services/Transilation/my-translate';
import { OptionsModal } from '../../../../shared/components/options-modal/options-modal';

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
    OptionsModal,
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
  currentType = signal<'goal' | 'activityLevel' | 'weight'>('goal');
  readonly goal = this.authFacade.goal;
  readonly activityLevel = this.authFacade.activityLevel;
  readonly weight = this.authFacade.weight;
  readonly visible = signal<boolean>(false);
  readonly logoutVisible = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);


  changePasswordForm!: FormGroup;
  isModalOpen = signal(false);
  modalTitle = signal('');
  modalOptions = signal<string[]>([]);

  newPassword = signal('');
  confirmPassword = signal('');

  // Getters for Controls
  get currentPasswordControl() {
    return this.changePasswordForm.get('password');
  }
  get newPasswordControl() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmPasswordControl() {
    return this.changePasswordForm.get('confirmPassword');
  }

  passwordsMismatch = computed(() => {
    const newPass = this.newPassword();
    const confirmPass = this.confirmPassword();

    if (!confirmPass) return false;
    return newPass !== confirmPass;
  });

  readonly profileMetrics = [
    { label: 'profile.settingItems.goal', signal: this.goal, type: 'goal' as const },
    {
      label: 'profile.settingItems.activityLevel',
      signal: this.activityLevel,
      type: 'activityLevel' as const,
    },
    { label: 'profile.settingItems.weight', signal: this.weight, type: 'weight' as const },
  ];
  readonly modalsData = {
    goal: {
      title: 'What Is Your Goal ?',
      options: [
        'Gain Weight',
        'Lose Weight',
        'Get Fitter',
        'Gain More Flexible',
        'Learn The Basic',
      ],
    },
    activityLevel: {
      title: 'What Is Your Level ?',
      options: ['level1', 'level2', 'level3', 'level4', 'level5'],
    },
    weight: {
      title: 'What Is Your Weight ?',
      options: ['40kg', '60kg', '80kg', '100kg'],
    },
  };
  onOptionSelected(value: string, type: 'goal' | 'activityLevel' | 'weight') {
    const apiKeyMap: Record<'goal' | 'activityLevel' | 'weight', keyof IEditReq> = {
      goal: 'goal',
      activityLevel: 'activityLevel',
      weight: 'weight',
    };

    const currentUser = this.authFacade.user();

    const payload: IEditReq = {
      firstName: currentUser?.user.firstName ?? '',
      lastName: currentUser?.user.lastName ?? '',
      email: currentUser?.user.email ?? '',
      gender: currentUser?.user.gender ?? '',
      age: currentUser?.user.age ?? 0,
      weight: this.authFacade.weight(),
      height: currentUser?.user.height ?? 0,
      activityLevel: this.authFacade.activityLevel(),
      goal: this.authFacade.goal(),
      [apiKeyMap[type]]: type === 'weight' ? +value.replace('kg', '') : value,
    };

    this.authFacade.updateProfile(payload).subscribe({
      next: () => {
        if (type === 'goal') this.authFacade.goal.set(value);
        if (type === 'activityLevel') this.authFacade.activityLevel.set(value);
        if (type === 'weight') this.authFacade.weight.set(+value.replace('kg', ''));
        this.isModalOpen.set(false);
      },
      error: () => {},
    });
  }
  openModal(type: 'goal' | 'activityLevel' | 'weight') {
    this.currentType.set(type);
    this.modalTitle.set(this.modalsData[type].title);
    this.modalOptions.set(this.modalsData[type].options);
    this.isModalOpen.set(true);
  }
  settingItems = computed(() => [

  readonly settingItems = [
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
      confirmPassword: ['', [Validators.required]],
    });
  }

  openChangePasswordModal() {
    this.visible.set(true);
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
    this.changePasswordForm.reset();
    this.newPassword.set('');
    this.confirmPassword.set('');
  }

  onSubmit() {
    if (this.changePasswordForm.invalid || this.passwordsMismatch()) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const { confirmPassword, ...cleanPayload } = this.changePasswordForm.getRawValue();
    const payload: IChangePassReq = cleanPayload;

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
