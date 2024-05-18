import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedBackPopUpComponent } from '../product/feed-back-pop-up/feed-back-pop-up.component';
import { ProductService } from '../../../service/product.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-client-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrl: './client-order-details.component.css'
})
export class ClientOrderDetailsComponent implements OnInit {
  order: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productService : ProductService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      console.error('Order ID is missing');
      this.router.navigate(['/orders']);
      return;
    }
    this.orderService.getOrderById(id).subscribe(order => {
      this.order = order;
      this.productService.listProduct = order.products;
    }, error => {
      console.error('Error fetching order details:', error);
    });
  }

  cancelOrder() {
    if (this.order.status === 'Processing') {
      this.order.status = 'Cancelled';
      this.updateOrderStatus();
    }
  }
  formatDateString(dateString?: Date): string {
    if (!dateString) {
      return '-';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN', { year: 'numeric', month: 'short', day: '2-digit' });
  }

  markOrderReceived() {
    if (this.order.status === 'Delivering') {
      this.order.status = 'Finished';
      this.updateOrderStatus();
    }
  }

  writeReview() {
    this.dialog.open(FeedBackPopUpComponent);
  }

  updateOrderStatus() {
    this.orderService.updateOrder(this.order._id, this.order).subscribe(() => {
      this.router.navigate(['/orders']); // or refresh the current page to show status update
      this.toast.success({
        detail: 'Order status updated successfully!',
        summary: 'Success',
        duration: 5000
      });
    }, error => {
      console.error('Error updating order status:', error);
      this.toast.error({
        detail: 'Failed to update order status. Please try again later.',
        summary: 'Error',
        duration: 5000
      });
    });
  }
}  