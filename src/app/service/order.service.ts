import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Order } from '../models/order';// Update path as needed

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3002/api/orders'; // Adjust if your base URL differs
  private orderData: any;

  constructor(private http: HttpClient) {}

  setOrderData(data: any): void {
    this.orderData = data;
  }

  getOrderData(): any {
    return this.orderData;
  }

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateOrder(id: string, orderData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, orderData);
  }
  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
  searchOrderByOrderId(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
  getOrdersByUsername(username: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/userName/${username}`);
  }

getTotalOrders(): Observable<number> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map((orders: string | any[]) => orders.length)
  );
}
getTotalRevenue(): Observable<number> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(orders => orders.reduce((total, order) => total + order.totalPrice, 0))
  );
}

}
