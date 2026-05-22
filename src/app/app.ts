import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankService } from './service/bank-service';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private bankService = inject(BankService);
  private router = inject(Router);
  
  showSidebar = () => this.router.url !== '/login';
  
  ngOnInit() {
    this.bankService.getCurrentUser().subscribe({
      next: (user) => {
        sessionStorage.setItem('user_name', user.owner_name);
      }
    });
  }
}