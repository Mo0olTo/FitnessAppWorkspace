import { TestBed } from '@angular/core/testing';
import { AuthFacade } from './auth-facade';
import { AuthLib } from 'auth-lib';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { delay, of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AuthFacade', () => {
  let service: AuthFacade;
  let authLibMock: jasmine.SpyObj<AuthLib>;
  let cookieMock: jasmine.SpyObj<CookieService>;
  let routerMock: jasmine.SpyObj<Router>;
  let messageMock: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    authLibMock = jasmine.createSpyObj('AuthLib', ['SignIn', 'GetLoggedUserData']);
    // The facade's constructor calls initializeSession() which reads the auth
    // cookie. Default to no token so the constructor short-circuits and tests
    // start from a clean, signed-out state.
    cookieMock = jasmine.createSpyObj('CookieService', ['get', 'set', 'check']);
    cookieMock.get.and.returnValue('');
    cookieMock.check.and.returnValue(false);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    messageMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AuthFacade,
        { provide: AuthLib, useValue: authLibMock },
        { provide: CookieService, useValue: cookieMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageMock },
      ]
    });

    service = TestBed.inject(AuthFacade);
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should login successfully', async () => {
    const loginResponse = { message: 'success', token: 'fake_token' };
    const userResponse: any = { user: { firstName: 'ahmed' } };

    authLibMock.SignIn.and.returnValue(of(loginResponse as any));
    authLibMock.GetLoggedUserData.and.returnValue(of(userResponse));

    service.login({ email: 'ahmed@gmail.com', password: '12345' });

   
    await new Promise(resolve => setTimeout(resolve, 0));

    
    expect(cookieMock.set).toHaveBeenCalledWith('FitnessToken', 'fake_token', {
      path: '/',
      sameSite: 'Strict',
      secure: true,
    });

  
    expect(service.user()).toEqual(userResponse);
    expect(service.firstName()).toBe('ahmed');

    expect(routerMock.navigate).toHaveBeenCalledWith(['/main/home']);
   
    expect(service.isLogged()).toBeTrue();

    
    await new Promise(resolve => setTimeout(resolve, 500));

    expect(messageMock.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Welcome ahmed',
      detail: 'login Success',
      life: 4000,
    });

   
  });


  it('should handle login error', async () => {
    const errorResponse = {
      error: { error: 'wrong mail or wrong password' }
    };

    authLibMock.SignIn.and.returnValue(throwError(() => errorResponse));

    service.login({ email: 'wrong@gmail.com', password: 'wrongpass' });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(service.error()).toBe('wrong mail or wrong password');
    expect(messageMock.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'wrong mail or wrong password',
      detail: 'login Failed',
      life: 3000,
    });

    expect(service.isLogged()).toBeFalse();
    expect(service.user()).toBeNull();
    
  });


  it('should set loading to true while logging in', async () => {
    authLibMock.SignIn.and.returnValue(of({ message: 'success', token: 'fake_token' } as any).pipe(delay(0)));
    authLibMock.GetLoggedUserData.and.returnValue(of({ user: { firstName: 'ahmed' } } as any).pipe(delay(0)));

    service.login({ email: 'ahmed@gmail.com', password: '12345' });


  });

  it('should clear error on new login attempt', async () => {
    authLibMock.SignIn.and.returnValue(throwError(() => ({ error: { error: 'some error' } })));
    service.login({ email: 'wrong@gmail.com', password: 'wrong' });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(service.error()).toBe('some error');

    authLibMock.SignIn.and.returnValue(of({ message: 'success', token: 'token' } as any));
    authLibMock.GetLoggedUserData.and.returnValue(of({ user: { firstName: 'ahmed' } } as any));

    service.login({ email: 'ahmed@gmail.com', password: '12345' });

    expect(service.error()).toBeNull();

    await new Promise(resolve => setTimeout(resolve, 500));
  });


  it('should set user to null if GetLoggedUserData fails', async () => {
    authLibMock.SignIn.and.returnValue(of({ message: 'success', token: 'fake_token' } as any));
    authLibMock.GetLoggedUserData.and.returnValue(throwError(() => new Error('server error')));

    service.login({ email: 'ahmed@gmail.com', password: '12345' });

    await new Promise(resolve => setTimeout(resolve, 500));

    expect(service.user()).toBeNull();
    expect(service.isLogged()).toBeFalse();
  });
});