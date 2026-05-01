import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { Login } from './login';
import { AuthFacade } from '../../auth-facade/auth-facade';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authFacadeMock: jasmine.SpyObj<AuthFacade>;

  beforeEach(async () => {
      authFacadeMock = jasmine.createSpyObj('AuthFacade', ['login'], {
      loading: jasmine.createSpy().and.returnValue(false),
      error: jasmine.createSpy().and.returnValue(null),
    });

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: AuthFacade, useValue: authFacadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Email Validation', () => {
    it('should have no errors for valid email', () => {
      component.email.set('user@example.com');
      component.emailTouched.set(true);
      fixture.detectChanges();

      const errors = component.emailErrors();
      expect(errors).toBeUndefined();
    });

    it('should have required error for empty email', () => {
      component.email.set('');
      component.emailTouched.set(true);
      fixture.detectChanges();

      const errors = component.emailErrors();
      expect(errors).toEqual({ required: true });
    });

    it('should have email format error for invalid email without @', () => {
      component.email.set('invalidemail');
      component.emailTouched.set(true);
      fixture.detectChanges();

      const errors = component.emailErrors();
      expect(errors).toEqual({ email: true });
    });

    it('should have email format error for invalid email without domain', () => {
      component.email.set('user@');
      component.emailTouched.set(true);
      fixture.detectChanges();

      const errors = component.emailErrors();
      expect(errors).toEqual({ email: true });
    });

    it('should have email format error for email with spaces', () => {
      component.email.set('user @example.com');
      component.emailTouched.set(true);
      fixture.detectChanges();

      const errors = component.emailErrors();
      expect(errors).toEqual({ email: true });
    });

    it('should accept email with subdomain', () => {
      component.email.set('user@mail.example.com');
      component.emailTouched.set(true);
      fixture.detectChanges();

      const errors = component.emailErrors();
      expect(errors).toBeUndefined();
    });
  });

  describe('Password Validation', () => {
    it('should have no errors for valid password', () => {
      component.password.set('Password!');
      component.passwordTouched.set(true);
      fixture.detectChanges();

      const errors = component.passwordErrors();
      expect(errors).toBeNull();
    });

    it('should have required error for empty password', () => {
      component.password.set('');
      component.passwordTouched.set(true);
      fixture.detectChanges();

      const errors = component.passwordErrors();
      expect(errors).toEqual({ required: true });
    });

    it('should have pattern error for password without uppercase', () => {
      component.password.set('password!');
      component.passwordTouched.set(true);
      fixture.detectChanges();

      const errors = component.passwordErrors();
      expect(errors).toEqual({ pattern: true });
    });

    it('should have pattern error for password without special character', () => {
      component.password.set('Password1');
      component.passwordTouched.set(true);
      fixture.detectChanges();

      const errors = component.passwordErrors();
      expect(errors).toEqual({ pattern: true });
    });

    it('should have pattern error for password less than 8 characters', () => {
      component.password.set('Pass!');
      component.passwordTouched.set(true);
      fixture.detectChanges();

      const errors = component.passwordErrors();
      expect(errors).toEqual({ pattern: true });
    });

    it('should accept password with special characters like @#$%^&*', () => {
      component.password.set('MyP@ssw0rd#');
      component.passwordTouched.set(true);
      fixture.detectChanges();

      const errors = component.passwordErrors();
      expect(errors).toBeNull();
    });
  });

  describe('Form Validity', () => {
    it('should be invalid when both fields are empty', () => {
      component.email.set('');
      component.password.set('');
      fixture.detectChanges();

      expect(component.isFormValid()).toBeFalse();
    });

    it('should be invalid when only email is valid', () => {
      component.email.set('user@example.com');
      component.password.set('');
      fixture.detectChanges();

      expect(component.isFormValid()).toBeFalse();
    });

    it('should be invalid when only password is valid', () => {
      component.email.set('');
      component.password.set('Password!');
      fixture.detectChanges();

      expect(component.isFormValid()).toBeFalse();
    });

    it('should be valid when both email and password are valid', () => {
      component.email.set('user@example.com');
      component.password.set('Password!');
      fixture.detectChanges();

      expect(component.isFormValid()).toBeTrue();
    });

    it('should be invalid when email has format error', () => {
      component.email.set('invalid');
      component.password.set('Password!');
      fixture.detectChanges();

      expect(component.isFormValid()).toBeFalse();
    });
  });

  describe('Field Touch State', () => {
    it('should mark email as touched on touch', () => {
      component.touch('email');
      fixture.detectChanges();

      expect(component.emailTouched()).toBeTrue();
      expect(component.passwordTouched()).toBeFalse();
    });

    it('should mark password as touched on touch', () => {
      component.touch('password');
      fixture.detectChanges();

      expect(component.emailTouched()).toBeFalse();
      expect(component.passwordTouched()).toBeTrue();
    });

    it('should mark all fields as touched', () => {
      component.markAllTouched();
      fixture.detectChanges();

      expect(component.emailTouched()).toBeTrue();
      expect(component.passwordTouched()).toBeTrue();
    });

    it('should handle onFieldBlur for email', () => {
      component.onFieldBlur('email');
      fixture.detectChanges();

      expect(component.emailTouched()).toBeTrue();
    });

    it('should handle onFieldBlur for password', () => {
      component.onFieldBlur('password');
      fixture.detectChanges();

      expect(component.passwordTouched()).toBeTrue();
    });
  });

  describe('Form Reset', () => {
    it('should reset all fields to initial state', () => {
      component.email.set('user@example.com');
      component.password.set('Password!');
      component.emailTouched.set(true);
      component.passwordTouched.set(true);
      fixture.detectChanges();

      component.reset();
      fixture.detectChanges();

      expect(component.email()).toBe('');
      expect(component.password()).toBe('');
      expect(component.emailTouched()).toBeFalse();
      expect(component.passwordTouched()).toBeFalse();
    });
  });

  describe('Form Submission', () => {
    it('should call authFacade.login with valid credentials', () => {
      component.email.set('user@example.com');
      component.password.set('Password!');
      fixture.detectChanges();

      component.onSubmit();

      expect(authFacadeMock.login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Password!',
      });
    });

    it('should mark all fields as touched on submit', () => {
      component.onSubmit();
      fixture.detectChanges();

      expect(component.emailTouched()).toBeTrue();
      expect(component.passwordTouched()).toBeTrue();
    });

    it('should NOT call login when form is invalid (empty fields)', () => {
      component.email.set('');
      component.password.set('');
      fixture.detectChanges();

      component.onSubmit();

      expect(authFacadeMock.login).not.toHaveBeenCalled();
    });

    it('should NOT call login when email is invalid', () => {
      component.email.set('invalid-email');
      component.password.set('Password!');
      fixture.detectChanges();

      component.onSubmit();

      expect(authFacadeMock.login).not.toHaveBeenCalled();
    });

    it('should NOT call login when password is invalid', () => {
      component.email.set('user@example.com');
      component.password.set('weak');
      fixture.detectChanges();

      component.onSubmit();

      expect(authFacadeMock.login).not.toHaveBeenCalled();
    });
  });

  describe('Error State', () => {
    it('should reflect error state from facade', () => {
      const errorMessage = 'Invalid credentials';
      authFacadeMock.error.and.returnValue(errorMessage);
      fixture.detectChanges();

      expect(component.authFacade.error()).toBe(errorMessage);
    });

    it('should reflect null error state from facade', () => {
      authFacadeMock.error.and.returnValue(null);
      fixture.detectChanges();

      expect(component.authFacade.error()).toBeNull();
    });
  });

  describe('Computed Errors Object', () => {
    it('should return combined errors object', () => {
      component.email.set('invalid');
      component.password.set('weak');
      fixture.detectChanges();

      const errors = component.errors();
      expect(errors.email).toEqual({ email: true });
      expect(errors.password).toEqual({ pattern: true });
    });
  });

  describe('Computed Touched Object', () => {
    it('should return combined touched object', () => {
      component.touch('email');
      fixture.detectChanges();

      const touched = component.touched();
      expect(touched.email).toBeTrue();
      expect(touched.password).toBeFalse();
    });
  });
});
