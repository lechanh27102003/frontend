import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { Cart } from '../../models/Cart';
import { CartService } from '../../../service/client-service/cart.service';
import { Order } from '../../../models/order';
import { PromotionService } from '../../../service/promotion.service';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CartItem } from '../../models/CartItem';


@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})

export class ShippingInfoComponent {
  discountApplied: boolean = false;
  cart: Cart = { items: [], totalPrice: 0, totalCount: 0 };
  orderForm = {
    fullName: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    email: '',
    phone: '',
    note: '', 
  };
  paymentMethod = '';
  code: string = '';
  description = '';
  discountPrice: number = 0;

  showToast: boolean = false; 
  toastMessage: string = ''; 


  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private promotionService : PromotionService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;
    });
  }

  isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Email validation regex
    const phoneRegex = /^\d{10}$/;                   // Phone number validation regex

    // Check if the email is valid (only if provided)
    const emailValid = !this.orderForm.email || emailRegex.test(this.orderForm.email.trim());

    return (
      this.orderForm.fullName.trim() !== '' &&
      this.orderForm.city.trim() !== '' &&
      this.orderForm.district.trim() !== '' &&
      this.orderForm.ward.trim() !== '' &&
      this.orderForm.address.trim() !== '' &&
      phoneRegex.test(this.orderForm.phone.trim()) && // Use test() for phone number validation
      emailValid &&  // Include the updated email validation check using test()
      this.paymentMethod !== ''
    );
}



setPaymentMethod(method: string) {
  const validMethods = ['Cash on delivery (COD)', 'Bank Transfer'];
  if (validMethods.includes(method)) {
    this.paymentMethod = method;
    console.log('Payment Method Set:', this.paymentMethod);
  } else {
    console.error('Invalid Payment Method:', method);
  }
}

onDiscountCodeInput() {
  console.log('Đã nhập mã giảm giá:', this.code);
}
applyDiscountCode() {
  if (this.discountApplied) {
    this.toast.info({detail:"INFO",summary:'Discount already applied',sticky:true});
    return; 
  }
  console.log('Giá trị của code:', this.code); 
  this.promotionService.applyDiscountCode(this.code, this.cart.totalPrice).subscribe(
    (response) => {
      if (response && response.valid) {
        this.description = response.description;
        this.discountPrice = response.discountedTotal;
        this.discountApplied = true; 
        this.toast.success({detail:"SUCCESS",summary:'Discount was applied successfully',duration:5000});
      } else {
        this.description = 'Invalid discount code';
        }
      },
      (error) => {
        this.toast.error({detail:"ERROR",summary:'Error applying discount code',sticky:true});
        this.description = 'Error applying discount code';

      }
  );
}

placeOrder() {
  // First, check if the form is valid
  if (!this.isFormValid()) {
    // If the form is not valid, show an error message and stop further execution
    this.toast.error({
      detail: "ERROR",
      summary: 'Please fill all required fields correctly and select a payment method',
      duration: 5000
    });
    return;
  }

  // If the form is valid, log this status and prepare the order data
  console.log('Form is valid!');
  const orderData = {
    fullName: this.orderForm.fullName,
    city: this.orderForm.city,
    district: this.orderForm.district,
    ward: this.orderForm.ward,
    address: this.orderForm.address,
    email: this.orderForm.email,
    phone: this.orderForm.phone,
    note: this.orderForm.note,
    paymentMethod: this.paymentMethod,
    subtotal: this.cart.totalPrice,
    shipfee: 30000, // Static shipping fee for example
    discountPrice: this.discountPrice,
    total: this.cart.totalPrice + 30000 - Number(this.discountPrice),
    cartItems: this.cart.items
  };

  // Save or send this data to your service or backend for processing
  this.orderService.setOrderData(orderData);
  // Navigate to the order confirmation page with discount as a query param
  this.router.navigate(['/order-confirmation'], { queryParams: { discount: this.discountPrice } });
}

}