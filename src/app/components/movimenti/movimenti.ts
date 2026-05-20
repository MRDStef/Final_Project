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

  movimenti = signal<any[]>([]);
  error = signal('');

  showModal = signal(false);
  selectedMovimento = signal<any>(null);

  constructor() {
    this.loadMovimenti();
  }

  loadMovimenti() {
    this.bankService.getTransactions().subscribe({
      next: (data: any) => {
        this.movimenti.set(data);
      },
      error: () => {
        this.error.set('Impossibile caricare i movimenti');
      }
    });
  }

  openModal(movimento: any) {
    this.selectedMovimento.set(movimento);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedMovimento.set(null);
  }

  formatAmount(amount: number, type: string): string {
    const formatted = Math.abs(amount).toFixed(2);
    return type === 'deposit' ? `+ ${formatted} €` : `- ${formatted} €`;
  }

  getAmountClass(type: string): string {
    return type === 'deposit' ? 'positive' : 'negative';
  }

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