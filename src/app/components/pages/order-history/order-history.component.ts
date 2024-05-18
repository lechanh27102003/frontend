import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../service/order.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = '';
  searchControl = new FormControl();
  displayedOrders: Order[] = [];
  userName: string = '';

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const loggedInUser = this.authService.getCurrentUser();
    if (loggedInUser && loggedInUser.name) {
      this.userName = loggedInUser.name;
      this.getOrderData();
    }
  }

  getOrderData(): void {
    this.orderService.getOrdersByUsername(this.userName).subscribe({
      next: (data: Order[]) => {
        // Sort orders by date in descending order
        this.orders = data.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('There was an error fetching orders!', error);
      }
    });
  }
  

  applyFilters() {
    this.filteredOrders = this.selectedStatus
      ? this.orders.filter(order => order.status === this.selectedStatus)
      : this.orders;
  
    this.updatePagination();
    this.setPage(1);
  }
  
  filterOrdersByStatus() {
    this.applyFilters();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredOrders.length);
    this.displayedOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    this.setPage(newPage);
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const query = this.searchControl.value.trim();
      if (query) {
        const foundOrder = this.orders.find(order => order._id === query);
        if (foundOrder) {
          this.goToOrderDetails(foundOrder._id);
        } else {
          alert('Order not found!');
        }
      }
    }
  }

  goToOrderDetails(orderId: string) {
    this.router.navigate(['/client-order-details', orderId]);
}

}
