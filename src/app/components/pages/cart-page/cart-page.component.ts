import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/client-service/cart.service';
import { Cart } from '../../models/Cart';
import { CartItem } from '../../models/CartItem';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  quantity = 1;
  totalOriginalPrice: number = 0;
  totalPrice: number = 0;
  
  constructor(private cartService: CartService, private router: Router, private toast: NgToastService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this.refreshCartStock().then(() => {
    this.cart.items.forEach((cartItem) => {
      this.updateCartItem(cartItem);
    });
    this.calculateTotalCount();
    this.calculateTotalPrices();
  });
}
async refreshCartStock(): Promise<void> {
  for (let cartItem of this.cart.items) {
    const updatedProduct = await this.cartService.getProductById(cartItem.product._id).toPromise();
    cartItem.product.stock = updatedProduct.stock;
  }
}


  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product._id);
    this.calculateTotalCount();
    this.calculateTotalPrices();
  }

  async onChangeQuantity(event: any, cartItem: CartItem) {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      await this.refreshCartStock();
      if (newQuantity > cartItem.product.stock) {
        this.toast.error({ detail: 'Quantity exceeds available stock.', summary: 'ERROR', duration: 5000 });
      } else if (newQuantity <= 0) {
        this.toast.error({ detail: 'Quantity must be at least 1.', summary: 'ERROR', duration: 5000 });
      } else {
        this.changeQuantity(cartItem, newQuantity);
        this.updateCartItem(cartItem);
        this.calculateTotalCount();
        this.calculateTotalPrices();
      }
    }
  }
  

  async plusQuantity(cartItem: CartItem) {
    await this.refreshCartStock();
    if (cartItem.quantity < cartItem.product.stock) {
      cartItem.quantity += 1;
      this.changeQuantity(cartItem, cartItem.quantity);
      this.updateCartItem(cartItem);
      this.calculateTotalCount();
      this.calculateTotalPrices();
    } else {
      this.toast.error({ detail: 'Reached maximum stock limit.', summary: 'ERROR', duration: 5000 });
    }
  }
  
  subtractQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      this.changeQuantity(cartItem, cartItem.quantity);
      this.updateCartItem(cartItem);
      this.calculateTotalCount();
      this.calculateTotalPrices();

    }
  }


  updateCartItem(cartItem: CartItem) {
    this.cartService.changeQuantity(cartItem.product, cartItem.quantity);
  }

  changeQuantity(cartItem: CartItem, newQuantity: number) {
    cartItem.quantity = newQuantity;
    cartItem.price = newQuantity * cartItem.product.price;
    this.updateCartItem(cartItem);
    this.cartService.changeQuantity(cartItem.product._id, newQuantity);
  }
  calculateTotalCount() {
    this.cart.totalCount = this.cart.items.reduce((total, item) => total + item.quantity, 0);
  
  }

  calculateTotalPrices(): void {
    this.totalOriginalPrice = this.cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    this.totalPrice = this.cart.items.reduce((total, item) => total + item.price, 0);
  }
  getTotalPrice(): number {
    return this.cart.items.reduce((total, item) => total + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }
  proceedToCheckout() {
    this.cartService.checkoutCart(this.cart, () => {
      this.router.navigateByUrl('/shipping-info'); 
    });
  }
}
