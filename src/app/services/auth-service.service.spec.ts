import { TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthService;
  let mockAfAuth: Partial<AngularFireAuth>;
  const mockUserCredential = {
    user: {
      uid: 'mockUid',
      email: 'mock@example.com',
      displayName: 'Mock User',
      emailVerified: true,
      phoneNumber: null,
      photoURL: 'https://mock-photo-url.com/photo.jpg',
      getIdToken: jasmine
        .createSpy('getIdToken')
        .and.returnValue(Promise.resolve('mockIdToken')),
    },
    credential: null,
    operationType: 'signIn',
    additionalUserInfo: {
      isNewUser: false,
      profile: null,
      providerId: 'password',
    },
    metaData: {
      creationTime: '2023-01-01T00:00:00Z',
      lastSignInTime: '2023-09-25T12:34:56Z',
    },
  };

  beforeEach(() => {
    mockAfAuth = {
      authState: of(null), // Inicialmente, usuário não autenticado
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and.returnValue(
          Promise.resolve({
            user: { uid: 'mockUid', email: 'mock@example.com' },
          })
        ),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and.returnValue(Promise.resolve(mockUserCredential)),
    };
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [{ provide: AngularFireAuth, useValue: mockAfAuth }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout ', () => {
    spyOn(service, 'logout').and.callThrough();
    service.logout();
    expect(service.logout).toHaveBeenCalled();
  });

  it('should listUsers ', () => {
    spyOn(service, 'listUsers').and.callThrough();
    service.listUsers();
    expect(service.listUsers).toHaveBeenCalled();
  });

  it('should login ', () => {
    spyOn(service, 'login').and.callThrough();
    service.login('teste@email.com', '123456');
    expect(service.login).toHaveBeenCalled();
  });

  it('should register ', () => {
    spyOn(service, 'register').and.callThrough();
    service.register('teste@email.com', '123456', {});
    expect(service.register).toHaveBeenCalled();
  });
});
