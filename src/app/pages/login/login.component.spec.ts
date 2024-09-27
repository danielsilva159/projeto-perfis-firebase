import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth-service.service';
import { mockAuthService } from '../../mocks/data.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.form.controls.email.setValue('teste@email.com');
    component.form.controls.senha.setValue('teste');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects entrar() to have been called', () => {
    spyOn(component, 'entrar').and.callThrough();
    component.entrar();
    expect(component.entrar).toHaveBeenCalled();
  });
});
