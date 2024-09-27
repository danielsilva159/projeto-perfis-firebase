import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth-service.service';
import { of } from 'rxjs';
import { mockAuthService } from '../../mocks/data.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects sair() to have been called', () => {
    spyOn(component, 'sair').and.callThrough();
    component.sair();
    expect(component.sair).toHaveBeenCalled();
  });
});
