import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from './bank-service';
import { map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private bankService = inject(BankService);
  private router = inject(Router);

  canActivate() {
    return this.bankService.checkAuth().pipe(
      map((res: any) => {
        if (res.authenticated) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}