import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../../../../service/order.service';
import { Order } from '../../../../../models/order';
const baseUrl = 'http://localhost:3002'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalRevenue!: number;
  totalOrders!: number;
  order: Order[] = [];
  displayedOrders: Order[] = [];

  constructor(private router: Router,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.getTotalOrders();
    this.getTotalRevenue();
    this.getOrders();
  }
  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.order = data;
      },
      error: (error) => {
        console.error('There was an error fetching orders!', error);
      }
    });
  }
  getTotalRevenue() {
    this.orderService.getTotalRevenue().subscribe({
      next: (revenue: number) => {
        this.totalRevenue = revenue;
      },
      error: (error: any) => {
        console.error('Error fetching total revenue:', error);
      }
    });
  }

  getTotalOrders(): void {
    this.orderService.getTotalOrders().subscribe({
      next: (total: number) => {
        this.totalOrders = total;
      },
      error: (error: any) => {
        console.error('Error fetching total orders:', error);
      }
    });
  
  
   /* this.recentOrders = [
      { code: 'ORD001', date: '2024-04-20', total: 150, status: 'Delivered' },
      { code: 'ORD002', date: '2024-04-19', total: 200, status: 'Processing' },
      { code: 'ORD003', date: '2024-04-18', total: 100, status: 'Can' },
    ];*/
    
    
  }
  navigateOrder() {
    this.router.navigate(['/admin/order']) 
  }
  navigateFeedbacks(){
    this.router.navigate(['/admin/feedback'])
  }
  
}
