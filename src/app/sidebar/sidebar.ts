import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BankService } from '../service/bank-service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  private bankService = inject(BankService);
  private router = inject(Router);
  
  userName() {
    return sessionStorage.getItem('user_name') || 'Utente';
  }

  logout() {
    this.bankService.logout().subscribe({
      next: () => {
        sessionStorage.removeItem('user_name');
        this.router.navigate(['/login']);
      }
    });
  }
}