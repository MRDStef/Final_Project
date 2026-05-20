import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from '../../service/bank-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private bankService = inject(BankService);
  private router = inject(Router);
  
  ownerName = '';
  password = '';
  
  error = signal('');

  onSubmit() {
    if (!this.ownerName || !this.password) {
      this.error.set('Inserisci nome account e password');
      return;
    }
    
    this.error.set('');
    
    this.bankService.login(this.ownerName, this.password).subscribe({
      next: (response) => {
        sessionStorage.setItem('user_name', response.user.owner_name);
        this.router.navigate(['/movimenti']);
      },
      error: (err) => {
        this.error.set(err.error?.error || 'Credenziali non valide');
      }
    });
  }
}