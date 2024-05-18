import { Component } from '@angular/core';
import { OrderService } from '../../../service/order.service'; // Update path as needed

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent {
  orderId: string = '';
  order: any = null;

  constructor(private orderService: OrderService) {}

  searchOrder(): void {
    if (!this.orderId) return; // Optionally, add validation or error handling

    this.orderService.getOrderById(this.orderId).subscribe(
      order => {
        this.order = order;
      },
      error => {
        console.error('Error fetching order:', error);
        this.order = null; // Reset the order details or handle errors appropriately
      }
    );
  }
  formatDateString(dateString?: Date): string {
    if (!dateString) {
      return '-';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN', { year: 'numeric', month: 'short', day: '2-digit' });
  }
}
