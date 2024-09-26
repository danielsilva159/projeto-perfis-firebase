import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    map((user) => {
      if (user) {
        console.log(user);

        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
