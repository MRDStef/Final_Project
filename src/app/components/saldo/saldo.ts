import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService } from '../../service/bank-service';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo.html',
  styleUrl: './saldo.css',
})

export class Saldo {
  private bankService = inject(BankService);
  
  saldo = signal(0);
  currency = signal('EUR');
  error = signal('');

  constructor() {
    this.loadBalance();
  }

  loadBalance() {
    this.bankService.getBalance().subscribe({
      next: (data: any) => {
        this.saldo.set(data.balance);
        this.currency.set(data.currency);
      },
      error: () => {
        this.error.set('Impossibile caricare il saldo');
      }
    });
  }
}