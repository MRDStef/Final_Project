import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../service/bank-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deposito.html',
  styleUrl: './deposito.css',
})
export class Deposito {
  
  private bankService = inject(BankService);
  private router = inject(Router);
  
  // Form fields
  amount: number | null = null;
  description: string = '';
  
  // UI states
  loading = signal(false);
  success = signal(false);
  error = signal('');
  
  // Validazioni
  amountError = signal('');
  descriptionError = signal('');

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
    }
    
    if (!this.description.trim()) {
      this.descriptionError.set('La descrizione è obbligatoria');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Chiamata API
    this.loading.set(true);
    
    this.bankService.deposit(this.amount!, this.description).subscribe({
      next: (response: any) => {
        console.log('Deposito riuscito:', response);
        this.loading.set(false);
        this.success.set(true);
        
        // Reset form dopo 2 secondi e reindirizza
        setTimeout(() => {
          this.success.set(false);
          this.router.navigate(['/movimenti']);
        }, 2000);
      },
      error: (err) => {
        console.error('Errore deposito:', err);
        this.loading.set(false);
        this.error.set(err.error?.error || 'Errore durante il deposito');
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