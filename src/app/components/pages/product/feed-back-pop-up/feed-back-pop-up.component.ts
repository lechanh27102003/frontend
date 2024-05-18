import { Component, Input } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ProductCLientService } from '../../../../service/client-service/product-client.service';
import { ProductService } from '../../../../service/product.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../../service/auth.service';

@Component({
	selector: 'app-feed-back-pop-up',
	templateUrl: './feed-back-pop-up.component.html',
	styleUrl: './feed-back-pop-up.component.css'
})
export class FeedBackPopUpComponent {
	listProduct: any;
	textInputValue: string = '';
	feedbackControls: FormControl[] = [];
	imageUrl : string[] = [];
	feedbacks !: any[];
	totalRating: { rating: number; countfb: number; }[] = [];
	user : any;
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		public dialogRef: MatDialogRef<FeedBackPopUpComponent>,
		private productSer: ProductService,
		private productClientSer: ProductCLientService,
		private toast : NgToastService

	) { }
	ngOnInit() {
		const user = this.authService.getCurrentUser();
		if (user) {
			this.authService.getUserById(user._id).subscribe({
				next : data => {
					this.user = data;
				}
			})
		}
		this.listProduct = this.productSer.listProduct;
		this.listProduct.forEach(async (product : any) => {
			this.feedbackControls.push(new FormControl(''));
			this.productClientSer.getFeedbacksByProductId(product.productId).subscribe({
				next : data => {
					let total = 0;
					data.forEach(item => {
						total += item.rating;
					});
					this.totalRating.push({ rating: total, countfb: data.length });
				}
			})
		});
	}
	closePopup(): void {
		this.dialogRef.close();
	}
	async submitAllForms(): Promise<void> {
		this.listProduct.forEach((product : any, index: number) => {
			let feedbackObject = {
				productID: product.productId,
				rating: this.rating[index],
				description: this.feedbackControls[index].value,
				dateTime: Date.now(),
				image: this.imageUrl[index],
				userId : this.user._id
			}
			this.productClientSer.Feedback(feedbackObject).subscribe(res => {
				this.productClientSer.getProductById(product.productId).subscribe({
					next : data => {
						let pro = data;
						pro.rating = Math.ceil((this.totalRating[index].rating + this.rating[index]) / (this.totalRating[index].countfb + 1));
						this.productSer.updateRating(product.productId, pro).subscribe(res); // update rating db
					}
				})
				this.productSer.updateProduct.next(true); // update rating UI
			})
		});
		this.dialogRef.close();
	}

	rating: number[] = [];
	hoveredRating: number[] = [];

	highlightStars(star: number, index: number): void {
		this.hoveredRating[index] = star;
	}

	setRating(rating: number, index: number): void {
		this.rating[index] = rating;
	}

	resetStarState(index: number): void {
		this.hoveredRating[index] = 0;
	}

	onFileSelected(event: any, index : number): void {
		const file: File = event.target.files[0];
		const maxSizeKB: number = 5000;

		if (file) {
			if (file.size <= maxSizeKB * 1024) { // Convert KB to bytes
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						this.imageUrl[index] = reader.result;
					}
				};
			} else {
				this.imageUrl[index] = '';
				this.toast.error({ detail: "ERROR", summary: "File size exceeds 5000 KB. Please choose a smaller file.", duration: 2000 });
			}
		}
	}
}
