import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../../service/category.service';
import { ProductService } from '../../../../../../service/product.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{
	@Input() showPopup: boolean = false;
	@Input() categories: any[] = [];
	@Input() product: any;
	@Output() close: EventEmitter<void> = new EventEmitter<void>();
	@Output() addProduct: EventEmitter<{
		productName: string,
		description: string,
		price: number,
		image: string,
		stock: number,
		categoryId: string,
		discount: number
	}> = new EventEmitter<{
		productName: string,
		description: string,
		price: number,
		categoryId: string,
		image: string,
		stock: number,
		discount: number
	}>();

	listCategory = [];

	productName: string = '';
	productDescription: string = '';
	price: number = 0;
	categoryId !: string;
	imageUrl: string = '';
	stock: number = 0;
	discount !: number;
	title !: string;

	constructor(private productService: ProductService, private toast: NgToastService) { }
	ngOnInit(): void {
		if (this.product != null) {
			this.title = "Update " + this.product.product.productName;
			this.productName = this.product.product.productName;
			this.price = this.product.product.price;
			this.categoryId = this.product.product.categoryId;
			this.stock = this.product.product.stock;
			this.discount = this.product.product.discount;
			this.productDescription = this.product.product.description;
			this.imageUrl = this.product.product.image;
		} else {
			this.title = "Add Product";
		}
	}
	

	submitForm(): void {
		if (this.productName.trim() && this.productDescription.trim()) {
			this.addProduct.emit({
				productName: this.productName,
				description: this.productDescription,
				price: this.price,
				categoryId: this.categoryId,
				image: this.imageUrl,
				stock: this.stock,
				discount: this.discount

			});
			this.closePopup();
			this.productName = '';
			this.productDescription = '';
			this.price = 0;
			this.categoryId = "";
			this.imageUrl = "";
			this.stock = 0;
			this.discount = 0;
		}
	}


	closePopup(): void {
		this.close.emit();
	}

	onFileSelected(event: any): void {
		const file: File = event.target.files[0];
		const maxSizeKB: number = 5000;

		if (file) {
			if (file.size <= maxSizeKB * 1024) { // Convert KB to bytes
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						this.imageUrl = reader.result;
					}
				};
			} else {
				this.imageUrl = '';
				this.toast.error({ detail: "ERROR", summary: "File size exceeds 5000 KB. Please choose a smaller file.", duration: 2000 });
			}
		}
	}
}
