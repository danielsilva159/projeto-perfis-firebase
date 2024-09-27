import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';
import { environment } from '../../../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../../services/auth-service.service';
import { mockAuthService } from '../../../mocks/data.mock';

describe('CadastrarUsuarioComponent', () => {
  let component: CadastrarUsuarioComponent;
  let fixture: ComponentFixture<CadastrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastrarUsuarioComponent,
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects sair() to have been called', () => {
    spyOn(component, 'salvar').and.callThrough();
    component.salvar();
    expect(component.salvar).toHaveBeenCalled();
  });
});
