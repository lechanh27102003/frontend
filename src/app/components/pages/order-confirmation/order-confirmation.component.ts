import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { CartService } from '../../../service/client-service/cart.service';
import { PromotionService } from '../../../service/promotion.service';
import { AuthService } from '../../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeDialogComponent } from '../qr-code-dialog/qr-code-dialog.component';
import { OrderSuccessDialogComponent } from '../order-success-dialog/order-success-dialog.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderItems: any[] = [];
  shippingInfo: any = {};
  paymentMethod: string = '';
  subtotal: number = 0;
  shipfee: number = 0;
  discount:number=0;
  total: number = 0;
  userName: string = 'Guest';

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private promotionService: PromotionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.discount = params['discount'] || 0;
    });
    // Retrieve order data from OrderService
    const orderData = this.orderService.getOrderData();

    // Extract product and shipping information
    this.orderItems = orderData.cartItems;
    this.shippingInfo = {
      fullName: orderData.fullName,
      city: orderData.city,
      district: orderData.district,
      ward: orderData.ward,
      address: orderData.address,
      email: orderData.email,
      phone: orderData.phone,
      note: orderData.note
    };

    // Get payment information
    this.paymentMethod = orderData.paymentMethod;
    // Get other order details
    this.subtotal = orderData.subtotal;
    this.shipfee = orderData.shipfee;
    this.discount=orderData.discountPrice;
    this.total = orderData.total;
    this.loadUserData();
    
  }

  private loadUserData() {
    const user = this.authService.getCurrentUser();
    if (user && user.name) {
      this.userName = user.name; // Use 'name' instead of '_id'
    }
  }

  confirmOrder(): void {
    const orderData = {
      products: this.orderItems.map(item => ({
        productId: item.product._id,
        productName: item.product.productName,
        productImage: item.product.image,
        quantity: item.quantity,
        price: item.quantity * item.product.price 
      })),
      userName: this.userName,  
      shipTo: this.shippingInfo,
      subTotal: this.subtotal,
      discountPrice: this.discount,
      shippingFee: this.shipfee,
      totalPrice: this.total,
      paymentMethod: this.paymentMethod,
      staffNote: '',
      note: this.shippingInfo.note,
      email: this.shippingInfo.email
    };
  
    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order confirmed:', response);
        localStorage.setItem('orderId', response._id);  // Save order ID to local storage
        localStorage.setItem('orderEmail', this.shippingInfo.email);  // Save order email to local storage
        this.cartService.clearCart(); // Clear the cart after successful order
        if (this.paymentMethod === 'Bank Transfer') {
          const qrCodeUrl = this.generateQrCodeUrl(response._id, this.total);
          this.router.navigate(['/qr-code'], { queryParams: { url: qrCodeUrl, orderId: response._id } });
        } else {
          this.router.navigate(['/order-success']);
        }
        
      },
      error: (error) => {
        console.error('Error confirming order:', error);
        this.toast.error({
          detail: "Stock Unvailable ",
          summary: 'Fail to create order, please check your cart again',
          duration: 5000
        });
      }
    });
  }
  
  checkLocalStorageQuota(): void {
    const localStorageSize = JSON.stringify(localStorage).length;
    const totalQuota = 5 * 1024 * 1024; // Giả sử giới hạn là 5MB
  
    console.log('Dung lượng đã sử dụng trong local storage:', localStorageSize, 'bytes');
    console.log('Dung lượng tối đa được phép trong local storage:', totalQuota, 'bytes');
  
    if (localStorageSize >= totalQuota) {
      console.log('Vượt quá dung lượng tối đa của local storage.');
    } else {
      console.log('Chưa vượt quá dung lượng tối đa của local storage.');
    }
  }
  
  generateQrCodeUrl(orderId: string, totalPrice: number): string {
    const bankId = '970422';
    const accountNo = '115952872022';
    const template = 'compact2';
    const amount = totalPrice;  // Use totalPrice as the amount
    const description = encodeURIComponent(`Order ID: ${orderId}`);  // Use orderId as the payment description
    const accountName = encodeURIComponent('NGUYỄN HOÀNG PHƯƠNG NGÂN');  // Account name

    return `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`;
  }
}
