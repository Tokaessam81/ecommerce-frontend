// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../Models/services/auth.service';
// import { Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   const token = auth.getToken();

//   if (token) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// };
// src/app/guards/auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Models/services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  if (token) return true;

  router.navigate(['/login']);
  return false;
};
