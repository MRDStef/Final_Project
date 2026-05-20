import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../service/bank-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prelievo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prelievo.html',
  styleUrl: './prelievo.css',
})
export class Prelievo {
  
  private bankService = inject(BankService);
  private router = inject(Router);
  
  amount: number | null = null;
  description: string = '';
  currentBalance: number = 0;
  
  success = signal(false);
  error = signal('');
  checkingBalance = signal(true);
    
  amountError = signal('');
  descriptionError = signal('');

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

  onSubmit() {
    this.amountError.set('');
    this.descriptionError.set('');
    this.error.set('');
      
    let isValid = true;
    
    if (!this.amount || this.amount <= 0) {
      this.amountError.set('L\'importo deve essere maggiore di zero');
      isValid = false;
    } else if (this.amount > this.currentBalance) {
      this.amountError.set(`Importo superiore al saldo disponibile (${this.currentBalance.toFixed(2)} €)`);
      isValid = false;
    }
    
    if (!this.description.trim()) {
      this.descriptionError.set('La descrizione è obbligatoria');
      isValid = false;
    }
    
    if (!isValid) return;
      
    this.bankService.withdraw(this.amount!, this.description).subscribe({
      next: () => {
        this.success.set(true);
        
        setTimeout(() => {
          this.success.set(false);
          this.router.navigate(['/movimenti']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 422) {
          this.error.set('Saldo insufficiente per questo prelievo');
          this.loadBalance(); 
        } else {
          this.error.set(err.error?.error || 'Errore durante il prelievo');
        }
      }
    });
  }

  resetForm() {
    this.amount = null;
    this.description = '';
    this.success.set(false);
    this.error.set('');
    this.amountError.set('');
    this.descriptionError.set('');
  }
}