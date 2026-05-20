import { Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { Login } from './components/login/login';
import { Movimenti } from './components/movimenti/movimenti';
import { Deposito } from './components/deposito/deposito';
import { Prelievo } from './components/prelievo/prelievo';
import { Saldo } from './components/saldo/saldo';
import { Conversione } from './components/conversione/conversione';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'movimenti', component: Movimenti, canActivate: [AuthGuard] },
  { path: 'deposita', component: Deposito, canActivate: [AuthGuard] },
  { path: 'preleva', component: Prelievo, canActivate: [AuthGuard] },
  { path: 'saldo', component: Saldo, canActivate: [AuthGuard] },
  { path: 'conversione', component: Conversione, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];