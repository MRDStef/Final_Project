import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../service/bank-service';

@Component({
  selector: 'app-conversione',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversione.html',
  styleUrl: './conversione.css',
})
export class Conversione {
  private bankService = inject(BankService);
  
  conversionType: 'fiat' | 'crypto' = 'fiat';
  selectedCurrency: string = 'USD';
  selectedCrypto: string = 'BTC';
  currentBalance: number = 0;
  
  result: any = null;
  loading = signal(false);
  error = signal('');
  checkingBalance = signal(false);
  
  fiatCurrencies = ['USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'TRY'];
  cryptoCurrencies = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'DOGE', 'ADA', 'MATIC'];
  
  constructor() {
    this.loadBalance();
  }
  
  loadBalance() {
    this.checkingBalance.set(true);
    this.bankService.getBalance().subscribe({
      next: (data: any) => {
        this.currentBalance = data.balance;
        this.checkingBalance.set(false);
      },
      error: () => {
        this.error.set('Impossibile verificare il saldo disponibile');
        this.checkingBalance.set(false);
      }
    });
  }
  
  convert() {
    this.loading.set(true);
    this.error.set('');
    this.result = null;
    
    if (this.conversionType === 'fiat') {
      this.bankService.convertToFiat(this.selectedCurrency).subscribe({
        next: (data) => {
          console.log('Conversione fiat:', data);
          this.result = data;
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Errore conversione fiat:', err);
          this.error.set(err.error?.error || 'Errore nella conversione');
          this.loading.set(false);
        }
      });
    } else {
      this.bankService.convertToCrypto(this.selectedCrypto).subscribe({
        next: (data) => {
          console.log('Conversione crypto:', data);
          this.result = data;
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Errore conversione crypto:', err);
          this.error.set(err.error?.error || 'Errore nella conversione');
          this.loading.set(false);
        }
      });
    }
  }
  
  swapType() {
    this.conversionType = this.conversionType === 'fiat' ? 'crypto' : 'fiat';
    this.result = null;
    this.error.set('');
  }
  
  formatNumber(num: number, decimals: number = 2): string {
    return num.toLocaleString('it-IT', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
}