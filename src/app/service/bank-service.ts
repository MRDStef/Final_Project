import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private apiUrl = 'http://localhost';

  constructor(private http: HttpClient) {}

  // AUTH
  login(owner_name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, 
      { owner_name, password }, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, 
      {}, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/check`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  // TRANSACTIONS
  getTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/transactions`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  getBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/balance`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  deposit(amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/me/deposits`, 
      { amount, description }, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  withdraw(amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/me/withdrawals`, 
      { amount, description }, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  updateTransactionDescription(transactionId: number, description: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/me/transactions/${transactionId}`, 
      { description }, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/accounts/me/transactions/${transactionId}`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  getDeposits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/deposits`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  getWithdrawals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/withdrawals`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  convertToFiat(toCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/balance/convert/fiat?to=${toCurrency}`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }

  convertToCrypto(crypto: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/balance/convert/crypto?to=${crypto}`, 
      { withCredentials: true }  // ← AGGIUNGI QUESTO
    );
  }
}