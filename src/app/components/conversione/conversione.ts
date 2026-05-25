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
  currencyCode: string = 'EUR';
  
  result: any = null;
  error = signal('');
  
  fiatCurrencies = ['USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'TRY'];
  cryptoCurrencies = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'DOGE', 'ADA', 'MATIC'];
  
  constructor() {
    this.loadBalance();
  }
  
  loadBalance() {
    this.bankService.getBalance().subscribe({
      next: (data: any) => {
        this.currentBalance = data.balance;
        this.currencyCode = data.currency;
      },
    });
  }
  
  convert() {
    this.error.set('');
    this.result = null;
    
    if (this.conversionType === 'fiat') {
      this.bankService.convertToFiat(this.selectedCurrency).subscribe({
        next: (data) => {
          this.result = data;
        },
        error: (err) => {
          this.error.set(err.error?.error || 'Errore nella conversione');
        }
      });
    } else {
      this.bankService.convertToCrypto(this.selectedCrypto).subscribe({
        next: (data) => {
          this.result = data;
        },
        error: (err) => {
          this.error.set(err.error?.error || 'Errore nella conversione');
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