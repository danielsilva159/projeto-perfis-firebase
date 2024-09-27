import { of } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const mockAuthService: Partial<AuthService> = {
  user$: of({
    nome: 'teste',
    email: 'teste@email.com',
    perfil: 'usuario',
  }),
  listUsers: () => of([]),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
};
