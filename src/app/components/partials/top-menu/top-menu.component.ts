import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { ProductCLientService } from '../../../service/client-service/product-client.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../models/order';
import { CategoryService } from '../../../service/category.service';
import { CartService } from '../../../service/client-service/cart.service';

@Component({
	selector: 'app-top-menu',
	templateUrl: './top-menu.component.html',
	styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {

  @Output() hideTopMenuAndFooterEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false; 
  userName: string = ''; 
  isDropdownOpen: boolean = false;
  searchTerm!: string;
  cartItemsCount: number = 0;
  constructor(
    private productService: ProductService,
		private productClientService: ProductCLientService,
		private categoryService: CategoryService,
    private authService: AuthService, private router: Router,
    private cartService: CartService
  ) { }
	
  hideTopMenuAndFooter() {
		this.hideTopMenuAndFooterEvent.emit(true);
	};

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(cart => {
      this.cartItemsCount = cart.totalCount; // Cập nhật số lượng sản phẩm trong giỏ hàng
    });
     // Lắng nghe sự kiện loginSuccessEvent từ AuthService
     this.authService.loginSuccessEvent.subscribe((user: any) => {
      this.isLoggedIn = true; // Đã đăng nhập thành công
      this.userName = user.name; // Cập nhật thông tin người dùng
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.authService.getCurrentUser();
      this.userName = user.name;
    }
    
    // Subscribe vào sự kiện logoutEvent từ AuthService
    this.authService.logoutEvent.subscribe(() => {
      this.isLoggedIn = false; // Đã đăng xuất, cập nhật trạng thái đăng nhập
      this.userName = ''; // Xóa thông tin người dùng
      this.isDropdownOpen = false; // Đóng dropdown nếu đang mở
    });
  }

  onSearch() {
		if (this.searchTerm == "") {
			this.productClientService.getProducts(this.categoryService.categoryId).subscribe(res => {
				this.productService.searchProduct.next(res);
				this.categoryService.updateTitle.next(this.categoryService.categoryId);
			})
		}
		else {
			this.productService.getSearchProduct(this.searchTerm).subscribe(res => {
				this.productService.searchProduct.next(res);
			})
		}
	}

  logout(): void {
    // Xử lý đăng xuất
    this.authService.logout();
    this.router.navigate(['']); 
  }
  toggleDropdown(open: boolean): void {
    this.isDropdownOpen = open;
  }
  
}
