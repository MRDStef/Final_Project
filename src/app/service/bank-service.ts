import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private apiUrl = 'http://localhost:80';

  constructor(private http: HttpClient) {}

  // AUTH
  login(owner_name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, 
      { owner_name, password }, 
      { withCredentials: true }  
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, 
      {}, 
      { withCredentials: true }  
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`, 
      { withCredentials: true }  
    );
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/check`, 
      { withCredentials: true }  
    );
  }


  
  // TRANSACTIONS
  getTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/transactions`, 
      { withCredentials: true }  
    );
  }

  getBalance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/balance`, 
      { withCredentials: true }  
    );
  }

  deposit(amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/me/deposits`, 
      { amount, description }, 
      { withCredentials: true }  
    );
  }

  withdraw(amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/me/withdrawals`, 
      { amount, description }, 
      { withCredentials: true }  
    );
  }

  updateTransactionDescription(transactionId: number, description: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/me/transactions/${transactionId}`, 
      { description }, 
      { withCredentials: true }  
    );
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/accounts/me/transactions/${transactionId}`, 
      { withCredentials: true }  
    );
  }

  getDeposits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/deposits`, 
      { withCredentials: true }  
    );
  }

  getWithdrawals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/withdrawals`, 
      { withCredentials: true }  
    );
  }

  convertToFiat(toCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/balance/convert/fiat?to=${toCurrency}`, 
      { withCredentials: true }  
    );
  }

  convertToCrypto(crypto: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/me/balance/convert/crypto?to=${crypto}`, 
      { withCredentials: true }  
    );
  }
}