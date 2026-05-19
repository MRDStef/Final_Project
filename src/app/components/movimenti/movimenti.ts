import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService } from '../../service/bank-service';

@Component({
  selector: 'app-movimenti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movimenti.html',
  styleUrl: './movimenti.css',
})
export class Movimenti {
  
  private bankService = inject(BankService);
  
  // Signal per la lista dei movimenti
  movimenti = signal<any[]>([]);
  loading = signal(true);
  error = signal('');
  
  // Signal per il modal
  showModal = signal(false);
  selectedMovimento = signal<any>(null);

  constructor() {
    this.loadMovimenti();
  }

  loadMovimenti() {
    this.loading.set(true);
    
    this.bankService.getTransactions().subscribe({
      next: (data: any) => {
        console.log('Movimenti ricevuti:', data);
        this.movimenti.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Errore:', err);
        this.error.set('Impossibile caricare i movimenti');
        this.loading.set(false);
      }
    });
  }

  // Apri il modal con i dettagli del movimento
  openModal(movimento: any) {
    this.selectedMovimento.set(movimento);
    this.showModal.set(true);
  }

  // Chiudi il modal
  closeModal() {
    this.showModal.set(false);
    this.selectedMovimento.set(null);
  }

  // Formatta l'importo con segno positivo/negativo
  formatAmount(amount: number, type: string): string {
    const formatted = Math.abs(amount).toFixed(2);
    return type === 'deposit' ? `+ ${formatted} €` : `- ${formatted} €`;
  }

  // Restituisce la classe CSS in base al tipo
  getAmountClass(type: string): string {
    return type === 'deposit' ? 'positive' : 'negative';
  }

  // Formatta la data
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}