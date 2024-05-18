import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCLientService } from '../../../../service/client-service/product-client.service';
import { CategoryCLientService } from '../../../../service/client-service/category-client.service';
import { CategoryService } from '../../../../service/category.service';
import { CartService } from '../../../../service/client-service/cart.service';
import { ProductClient } from '../../../models/product-client';
import { ProductService } from '../../../../service/product.service';
import { Subscription, lastValueFrom } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../../service/auth.service';



@Component({
	selector: 'product-detail',
	templateUrl: './product-detail.component.html',
	styleUrl: './product-detail.component.css',

})

export class ProductDetailComponent implements OnInit {
	id !: string | null;
	product !: any;
	category !: any;
	isDescriptionTab: boolean = true;
	isFeedbackTab: boolean = false;
	hoveredRating: number = 0;
	rating: number = 0;
	feedbacks : any = [
	];
	
	quantity: number = 1;
	discountPrice !: number;
	private subscription = new Subscription();

	cartProducts: ProductClient[] = [];
	relatedProducts : any;

	constructor(private route: ActivatedRoute,
		private authService: AuthService,
		private ProductClientService: ProductCLientService,
		private productSer: ProductService,
		private categoryClientService: CategoryCLientService,
		private categoryService: CategoryService,
    	private cartService: CartService,
		private toast: NgToastService
	) {
    this.product = {} as ProductClient;
	}

	ngOnInit(): void {

    this.route.params.subscribe(params => {
        const productId = params['id']; 

        if (productId) {
            this.getProductDetails(productId);
            this.productSer.productID = productId;
            this.getFeedback();

            // Đăng ký sự kiện cập nhật sản phẩm từ service
            this.subscription = this.productSer.updateProduct.subscribe(res => {
                if (res) {
                    this.getProductDetails(productId);
                    this.getFeedback();
                }
            });
        }
    });
}

	getRelatedProduct() {
		this.ProductClientService.getRelatedProducts(this.category[0].categoryId).subscribe({
			next : data => {
				this.relatedProducts = data;
			}
		})
	}

	getProductDetails(productId: any) {
		this.ProductClientService.getProductById(productId).subscribe({
			next: data => {
				this.product = data;
				this.product.productName = this.product.productName.toUpperCase();
				this.productSer.product = this.product;
				this.calculatePrice(this.product);
				this.categoryService.getCategoryId(Number(this.product.categoryId)).subscribe({
					next: cate => {
						this.category = cate;
						this.getRelatedProduct();
					},
					error: (error) => {

					}
				});
			},
			error: error => {
				console.error('Error retrieving product:', error);
			}
		});
	}

	calculatePrice(product: any) {
		if (product.discount != null)
			this.discountPrice = Math.round(product.price * (1 - this.product.discount / 100));
		else
			this.discountPrice = product.price;
	}

	async getFeedback() {
		this.feedbacks = [];
		try {
			const feedbacksData = await this.ProductClientService.getFeedbacksByProductId(this.productSer.productID).toPromise();
			
			if (feedbacksData) {
				for (const item of feedbacksData) {
					const user = await this.authService.getUserById(item.userId).toPromise();
					this.feedbacks.push({ feedback: item, user: user });
				}
	
				if (this.feedbacks.length > 0) {
					let total = 0;
					this.feedbacks.forEach((element: any) => {
						total += element.feedback.rating;
						const specificDate = new Date(element.feedback.dateTime);
						let differenceTime = this.calculateDateDifference(element.feedback.dateTime);
						if (differenceTime.days > 0) {
							element.feedback.time = `${differenceTime.days} day`;
						} else {
							if (differenceTime.hours > 0) {
								element.feedback.time = `${differenceTime.hours} hours`;
							} else {
								element.feedback.time = `${differenceTime.minutes} minutes`;
							}
						}
					});
					this.rating = Math.round(total / this.feedbacks.length);
				}
			} else {
				// Handle the case where feedbacksData is undefined
			}
		} catch (error) {
			// Handle error if any
		}
	}
	

	calculateDateDifference(date: string): { days: number, hours: number, minutes: number } {
		// Parse the specific date string into a Date object
		let specificDate = new Date(date);

		// Calculate the difference between the current date and the specific date
		let differenceInMilliseconds = Date.now() - specificDate.getTime();

		// Convert the difference to days, hours, and minutes
		let days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
		let hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

		return { days, hours, minutes };
	}


	openDescriptionTab() {
		this.isDescriptionTab = true;
		this.isFeedbackTab = false;
	}

	openFeedbackTab() {
		this.isDescriptionTab = false;
		this.isFeedbackTab = true;
	}

	addToCart(): void {
		this.cartService.checkStockAvailability(this.product._id, this.quantity).subscribe((available) => {
		  if (available) {
			this.cartService.addToCart(this.product, this.quantity);
		  } else {
			this.toast.error({ detail: 'Out of stock. Cannot add to cart.', summary: 'ERROR', sticky: true });
		  }
		});
	  }
  
  updateQuantity(newQuantity: number): void {
    this.quantity = newQuantity;
  }
  

  plusQuantity(): void {
    this.quantity += 1;
  }

  subtractQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

}
