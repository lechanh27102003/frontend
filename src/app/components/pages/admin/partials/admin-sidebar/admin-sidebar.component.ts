import { Component } from '@angular/core';
import { SidebarService } from '../../../../../service/sidebar.service';
interface MenuItem {
  name: string;
  route: string;
  icon: string;
  submenu?: MenuItem[];
}


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  isSidebarClosed: boolean = false;

  menuItems: MenuItem[] = [
    { name: 'Dashboard', route: '/admin/dashboard', icon: 'fab fa-microsoft' },
    { name: 'Product', route: '/admin/product', icon: 'fas fa-shopping-bag' },
    { name: 'Order', route: '/admin/order', icon: 'fas fa-shopping-cart' },
    { name: 'Promotion', route: '/admin/promotion', icon: 'fas fa-gift' },
    { name: 'Blog', route: '/admin/blog', icon: 'fas fa-blog' },
    { name: 'Q&A', route: '/admin/admin-contact', icon: 'fas fa-question' },
  ];
  constructor(public sidebarService: SidebarService) {}
  // Phương thức để ẩn/hiện text khi sidebar đóng/mở
  toggleSidebar() {
    this.sidebarService.isSidebarClosed = !this.sidebarService.isSidebarClosed;
  }
}