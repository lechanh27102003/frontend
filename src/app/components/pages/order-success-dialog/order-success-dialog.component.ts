import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success-dialog',
  templateUrl: './order-success-dialog.component.html',
  styleUrls: ['./order-success-dialog.component.css']
})
export class OrderSuccessDialogComponent implements OnInit {
  orderId: string | null = null;  // Initialize orderId to null
  orderEmail: string | null = null;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId');
    this.orderEmail = localStorage.getItem('orderEmail');
    if (!this.orderId) {
      console.error('No order ID available');
      this.router.navigate(['/']);
    }
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function () {
      history.pushState(null, document.title, location.href);
    });
  }

  navigateHome(): void {
    // Clean up local storage
    localStorage.removeItem('orderId');
    localStorage.removeItem('orderEmail');
    this.router.navigate(['/']); // Navigate to home
  }
}
