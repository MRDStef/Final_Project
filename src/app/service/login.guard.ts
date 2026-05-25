import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from './bank-service';
import { map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  private bankService = inject(BankService);
  private router = inject(Router);

  canActivate() {
    return this.bankService.checkAuth().pipe(
      map((res: any) => {
        if (res.authenticated) {
            this.router.navigate(['/saldo']);
            console.log('Utente già autenticato, reindirizzamento a saldo');
            return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(true);
      })
    );
  }
}