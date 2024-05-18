import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cart } from '../../components/models/Cart';
import { CartItem } from '../../components/models/CartItem';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  
  apiUrl = 'https://plantique-api.onrender.com/api/products'; 

  constructor(private http: HttpClient, public toast: NgToastService) { }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  getCartItemByProductId(productId: string): CartItem | undefined {
    return this.cart.items.find(item => item.product.id === productId);
  }
  checkStockAvailability(productId: string, quantity: number): Observable<number> {
    return this.getProductById(productId).pipe(
        map(product => {
            const availableQuantity = this.calculateAvailableQuantity(product, quantity);
            return availableQuantity;
        })
    );
}
calculateAvailableQuantity(product: any, quantity: number): number {
  const cartItem = this.getCartItemByProductId(product._id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const availableQuantity = Math.min(quantity + currentQuantity, product.stock);
  return availableQuantity;
}
calculateCartItemPrice(cartItem: CartItem): void {
  if (cartItem.product.discount != null) {
    cartItem.price = Math.round(cartItem.product.price * (1 - cartItem.product.discount / 100));
  } else {
    cartItem.price = cartItem.product.price;
  }
  cartItem.price *= cartItem.quantity; // Tính toán giá dựa trên số lượng
}


addToCart(product: any, quantity: number): void {
  let cartItem = this.cart.items.find(item => item.product._id === product._id);
  let availableQuantity = quantity;

  if (cartItem) {
    availableQuantity += cartItem.quantity;
  }

  if (availableQuantity <= product.stock) {
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({ ...product });
      cartItem.quantity = quantity;
      this.cart.items.push(cartItem);
    }

    this.calculateCartItemPrice(cartItem);
    this.setCartToLocalStorage();
    this.toast.success({ detail: 'Product added to cart', summary: 'SUCCESS', duration: 5000 });
  } else {
    this.toast.error({ detail: 'Out of stock. Cannot add to cart.', summary: 'ERROR', sticky: true });
    if (cartItem) {
      cartItem.quantity = product.stock; 
    }
  }
}


  removeFromCart(productId: string): void {
    console.log('Before:', this.cart.items); 
    this.cart.items = this.cart.items.filter(item => item.product._id !== productId);
    console.log('After:', this.cart.items); 
    this.setCartToLocalStorage(); 
  }

  changeQuantity(productId: string, newQuantity: number): void {
    const cartItem = this.cart.items.find(item => item.product._id === productId);
    if (cartItem) {
      const availableQuantity = Math.min(newQuantity, cartItem.product.stock);
      cartItem.quantity = availableQuantity;
      this.calculateCartItemPrice(cartItem);
      this.setCartToLocalStorage();
    }
  }
// In CartService
clearCart(): void {
  this.cart = { items: [], totalPrice: 0, totalCount: 0 };
  localStorage.removeItem('Cart');  
  this.cartSubject.next(this.cart);
  this.toast.success({ detail: 'Cart cleared', summary: 'SUCCESS', duration: 5000 });
}


  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  checkoutCart(cart: Cart, callback: () => void): Observable<Cart> {
    const updatedItems: CartItem[] = [];
    cart.items.forEach((cartItem) => {
      this.checkStockAvailability(cartItem.product._id, cartItem.quantity).subscribe((availableQuantity) => {
        if (availableQuantity !== cartItem.quantity) {
          cartItem.quantity = availableQuantity;
          this.calculateCartItemPrice(cartItem); // Cập nhật giá sau khi thay đổi số lượng
          updatedItems.push(cartItem);
        }
      });
    });

    if (updatedItems.length > 0) {
      updatedItems.forEach((item) => {
        this.changeQuantity(item.product._id, item.quantity);
      });
      this.setCartToLocalStorage();
      this.cartSubject.next(this.cart);
      this.toast.warning({ detail: 'Quantity adjusted due to stock limit.', summary: 'WARNING', duration: 5000 });
    }
    // Calculate total count and price again after adjustments
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    callback(); // Gọi callback để chuyển trang
    return this.getCartObservable();
  }
}
