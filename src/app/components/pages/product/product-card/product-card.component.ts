import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../service/client-service/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
	selector: 'product-card',
	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.css'
})

export class ProductCardComponent implements OnInit {

	@Input() product: any;
	@Output() navigateToItem = new EventEmitter<number>();
	discountPrice: any;
	constructor(private router: Router, private cartService: CartService, private toast: NgToastService) { }

	ngOnInit(): void {
		this.calculatePrice(this.product);
	}

	

	calculatePrice(product: any) {
		if (product.discount != null)
			this.discountPrice = Math.round(product.price * (1 - this.product.discount / 100));
		else
			this.discountPrice = product.price;
	}

	onCardClick(productId: string) {
		this.router.navigate(['/product-detail', productId]);
	}
	addToCart(event: MouseEvent, product: any) {
		event.stopPropagation(); // Prevent the click event from propagating to the product card
		this.cartService.getProductById(product._id).subscribe(productData => {
			this.cartService.addToCart(productData, 1);
		});
	}
}
