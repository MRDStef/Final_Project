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
  
  // Form fields
  amount: number | null = null;
  description: string = '';
  currentBalance: number = 0;
  
  // UI states
  loading = signal(false);
  success = signal(false);
  error = signal('');
  checkingBalance = signal(true);
  
  // Validazioni
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
      error: (err) => {
        console.error('Errore caricamento saldo:', err);
        this.error.set('Impossibile verificare il saldo disponibile');
        this.checkingBalance.set(false);
      }
    });
  }

  onSubmit() {
    // Reset errori
    this.amountError.set('');
    this.descriptionError.set('');
    this.error.set('');
    
    // Validazioni
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
    
    // Chiamata API
    this.loading.set(true);
    
    this.bankService.withdraw(this.amount!, this.description).subscribe({
      next: (response: any) => {
        console.log('Prelievo riuscito:', response);
        this.loading.set(false);
        this.success.set(true);
        
        // Reset form dopo 2 secondi e reindirizza
        setTimeout(() => {
          this.success.set(false);
          this.router.navigate(['/movimenti']);
        }, 2000);
      },
      error: (err) => {
        console.error('Errore prelievo:', err);
        this.loading.set(false);
        
        if (err.status === 422) {
          this.error.set('Saldo insufficiente per questo prelievo');
          this.loadBalance(); // Ricarica il saldo
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