import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qr-code-dialog',
  templateUrl: './qr-code-dialog.component.html',
  styleUrls: ['./qr-code-dialog.component.css']
})
export class QrCodeDialogComponent implements OnInit {
  qrCodeUrl!: string;  // Store the QR Code URL
  orderId!: string;    // Store the Order ID

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.qrCodeUrl = params['url'];
      if (params['orderId']) {
        this.orderId = params['orderId'];
        localStorage.setItem('orderId', this.orderId);  // Store Order ID in localStorage if necessary
      }
    });
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function () {
      history.pushState(null, document.title, location.href);
    });
  
  }

  processPayment(): void {
    // Simulate payment processing
    const paymentSuccess = true; // This should be determined by actual payment logic
    if (paymentSuccess) {
      // Navigate to the order success page with the orderId
      this.router.navigate(['/order-success'], { queryParams: { orderId: this.orderId } });
    } else {
      // Handle payment failure scenario, maybe navigate to an error page or display a message
      console.error('Payment processing failed');
    }
  }
}
