import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../../service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any;  // Khai báo thuộc tính `order` với kiểu dữ liệu `any`

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOrderDetails();
  }

  
  getOrderDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      console.error('Order ID is missing');
      this.router.navigate(['/admin/orders']); // Chuyển hướng nếu không có ID
      return;
    }
    this.orderService.getOrderById(id).subscribe(order => {
      this.order = order;
    }, error => {
      console.error('Error fetching order details:', error);
    });
  }
  formatDateString(dateString?: Date): string {
    if (!dateString) {
      return '-';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN', { year: 'numeric', month: 'short', day: '2-digit' });
  }

  updateOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Order ID is missing');
      return;
    }
    this.orderService.updateOrder(id, this.order).subscribe(() => {
      this.router.navigate(['/admin/orders']);
      alert('Order updated successfully!');
    }, error => {
      console.error('Error updating order:', error);
    });
  }
}
