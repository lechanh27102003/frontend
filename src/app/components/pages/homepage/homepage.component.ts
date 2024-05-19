import { Component, OnInit, inject,HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { CategoryCLientService } from '../../../service/client-service/category-client.service';
import { CategoryClient } from '../../models/category-client';
import { ProductCLientService } from '../../../service/client-service/product-client.service';
import { CartService } from '../../../service/client-service/cart.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  categories: any;
  products: any;
  categoryId !: string | null;
  parallaxStyle: any = {};
  discountPrice: any;
  product: any;
  

  constructor(private categoryService: CategoryService, 
    private http: HttpClient,
    private categoryClientService: CategoryCLientService,
    private productService: ProductService,
    private productClientService: ProductCLientService,
    private cartService: CartService, private toast: NgToastService,
    private router: Router) {}

  contentTitle: string = "Chỉ trong tuần này";
  contentSubtitle: string = "Miễn phí giao hàng";


  ngOnInit(): void {
    this.getListCategory()
    this.getProducts();
  }
  calculatePrice(product: any) {
		if (product.discount != null)
			this.discountPrice = Math.round(product.price * (1 - this.product.discount / 100));
		else
			this.discountPrice = product.price;
	}
  getProducts() {
    this.http.get('https://plantique-api.onrender.com/api/products/getall/0').subscribe({
      next : data => {
        if (Array.isArray(data)) {
          this.products = data.slice(0, 8);
        } else {
          console.error('Invalid data type received from API');
        }
      }, error: err=>{
        console.log(err);}
    })
  }
  navigateToHighlightProduct(productId: string): void {
    this.router.navigate(['/product-client', productId]);
  }
  getListCategory() {
    this.http.get('https://plantique-api.onrender.com/api/categories').subscribe({
      next:res =>{
        this.categories = res;
      },error: err=>{
        console.log(err);
      }
    })
  }
  
  navigateToProduct():void {
    this.router.navigate(['/product-client/0']);
  }
  addToCart(event: MouseEvent, product: any) {
		event.stopPropagation(); // Prevent the click event from propagating to the product card
		this.cartService.getProductById(product._id).subscribe(productData => {
			this.cartService.addToCart(productData, 1);
		});
	}

}

  


