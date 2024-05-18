import { Component, OnInit } from '@angular/core';
import { ProductClient } from '../../models/product-client';
import { ProductCLientService } from '../../../service/client-service/product-client.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CategoryCLientService } from '../../../service/client-service/category-client.service';
import { CategoryService } from '../../../service/category.service';
import * as unorm from 'unorm';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
	selector: 'product-client',
	templateUrl: './product.component.html',
	styleUrl: './product.component.css',
	providers: [ProductCLientService]
})
export class ProductClientComponent implements OnInit {
	products: any;
	sortedProducts: any;
	categoryId !: string | null;
	category !: any;
	title !: string;
	subscription !: Subscription;
	selectedStarOption: string = '';
	selectedPriceOption: string = '';
	selectedRating: number = 0;
	hoveredRating: number = 0;
	minPrice: number = 0;
	maxPrice: number = 0;
	selectedCategories: string[] = [];
	checkAll = true;
	options: any[] = [
		{ name: 'Noodles', selected: false, id: 1 },
		{ name: 'Dried Food', selected: false, id: 2 },
		{ name: 'Tea and Coffee', selected: false, id: 3 },
		{ name: 'Nuts', selected: false, id: 4 }
	];

	filterListObject: any[] = [];
	constructor(private route: ActivatedRoute,
		private productService: ProductCLientService,
		private categoryService: CategoryService,
		private router: Router,
		private productSer: ProductService,
		private toast: NgToastService
	) { }

	ngOnInit(): void {
		this.subscription = this.productSer.searchProduct.subscribe(res => {
			if (res != null) {
				this.sortedProducts = this.products = res;
				this.title = "SEARCH RESULTS";
			}
		});

		this.subscription = this.categoryService.updateTitle.subscribe(res => {
			if (res != null) {
				this.getCategoryTitle();
			}
		});

		this.categoryId = this.route.snapshot.paramMap.get('id');
		this.categoryService.categoryId = Number(this.categoryId);
		this.productService.getProducts(Number(this.categoryId)).subscribe({
			next: data => {
				this.sortedProducts = this.products = data;
			}
		});

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const routeParams = this.route.snapshot.params;
				this.productService.getProducts(routeParams['id']).subscribe({
					next: data => {
						this.sortedProducts = this.products = data;
						this.categoryId = routeParams['id'];
						this.categoryService.categoryId = Number(this.categoryId);
						this.getCategoryTitle();
					}
				});
			}
		})
		this.getCategoryTitle();
		this.options.find(option => option.name === 'All Products').selected = true;
	}

	getCategoryTitle() {
		this.categoryService.getCategoryId(Number(this.categoryId)).subscribe({
			next: cate => {
				this.category = cate;
				this.category[0].categoryName = this.convertVietnameseToUppercase(this.category[0].categoryName);
				this.title = this.category[0].categoryName;
			},
			error: (error) => {

			}
		});
	}

	convertVietnameseToUppercase(text: string): string {
		// Normalize the text to NFD form (canonical decomposition)
		const normalizedText = unorm.nfd(text);
		// Convert to uppercase
		const uppercaseText = normalizedText.toUpperCase();
		// Reapply combining characters to get proper uppercase for Vietnamese
		return unorm.nfc(uppercaseText);
	}

	radioStarChanged(option: string): void {
		const existingItemIndex = this.filterListObject.findIndex(item => item.name === 'rating');

		if (existingItemIndex !== -1) {
			if (this.filterListObject[existingItemIndex].value === option) {
				this.filterListObject.splice(existingItemIndex, 1);
			} else {
				this.filterListObject[existingItemIndex].value = option;
			}
		} else {
			this.filterListObject.push({ name: 'rating', value: option });
		}
	}

	radioPriceChanged(option: string): void {
		const existingItemIndex = this.filterListObject.findIndex(item => item.name === 'price');

		if (existingItemIndex !== -1) {
			if (this.filterListObject[existingItemIndex].value === option) {
				this.filterListObject.splice(existingItemIndex, 1);
			} else {
				this.filterListObject[existingItemIndex].value = option;
			}
		} else {
			this.filterListObject.push({ name: 'price', value: option });
		}
	}

	sortProducts(data: any): void {
		let filteredProducts = [...data];
		const existingItemIndex = this.filterListObject.findIndex(item => item.name === 'rangePrice');

		if (this.minPrice > this.maxPrice) {
			this.toast.warning({ detail: "WARN", summary: "Max price need greater than min price", duration: 2000 });
			return;
		}

		if (this.maxPrice !== 0 && (this.minPrice !== this.maxPrice)) {
			if (existingItemIndex !== -1) {
				if (this.filterListObject[existingItemIndex].min !== this.minPrice || this.filterListObject[existingItemIndex].max !== this.maxPrice) {
					this.filterListObject[existingItemIndex].min = this.minPrice;
					this.filterListObject[existingItemIndex].max = this.maxPrice;
				}
			} else {
				this.filterListObject.push({ name: 'rangePrice', min: this.minPrice, max: this.maxPrice });
			}
		} else if (existingItemIndex !== -1) {
			this.filterListObject.splice(existingItemIndex, 1);
		}

		if (this.filterListObject.length > 0)
		{
			for (const filter of this.filterListObject) {
				switch (filter.name) {
					case 'rating':
						filteredProducts = filteredProducts.sort((a, b) => {
							if (filter.value === 'Up') {
								return a.rating - b.rating;
							} else {
								return b.rating - a.rating;
							}
						});
						break;
					case 'star':
						filteredProducts = filteredProducts.filter(product => product.rating === filter.value);
						break;
					case 'price':
						filteredProducts = filteredProducts.sort((a, b) => {
							if (filter.value === 'Up') {
								return a.price - b.price;
							} else {
								return b.price - a.price;
							}
						});
						break;
					case 'rangePrice':
						filteredProducts = filteredProducts.filter(product => product.price >= filter.min && product.price <= filter.max);
						break;
					default:
						this.sortedProducts = this.sortedProducts;
				}
			}
			this.sortedProducts = filteredProducts;
		}
		else this.sortedProducts = this.products;
	}
	highlightStars(star: number): void {
		this.hoveredRating = star;
	}

	setRating(star: number): void {
		this.selectedRating = star === this.selectedRating ? 0 : star;
		const existingItemIndex = this.filterListObject.findIndex(item => item.name === 'star');

		if (existingItemIndex !== -1) {
			if (this.filterListObject[existingItemIndex].value === star) {
				this.filterListObject.splice(existingItemIndex, 1);
			} else {
				this.filterListObject[existingItemIndex].value = star;
			}
		} else {
			this.filterListObject.push({ name: 'star', value: star });
		}
	}
	applyPriceRangeFilter(): void {
		this.sortProducts(this.sortedProducts);
	}

	onCheckAllChange(): void {
		this.checkAll = !this.checkAll;
		if (this.checkAll) {
			// Nếu chọn "All", cập nhật trạng thái cho tất cả các lựa chọn
			this.options.forEach(option => option.selected = false);
		}
		this.filterProduct();
	}
	onOptionChange(option: any): void {
		if (option.selected) {
			// Nếu chọn một lựa chọn riêng lẻ
			this.checkAll = false;
		} else {
			// Nếu hủy chọn một lựa chọn riêng lẻ
			// Kiểm tra xem còn lựa chọn nào được chọn không
			const exist = this.options.filter(opt => opt.selected === true);
			if (exist.length > 0)
				this.checkAll = false;
			else this.checkAll = true;
		}

		this.filterProduct();
	}
	filterProduct() {
		const selectedCategories = this.options.filter(opt => opt.selected && opt.name !== 'All Products').map(opt => opt.id);
		if (selectedCategories.length > 0) {
			this.sortedProducts = this.products.filter((product: any) => selectedCategories.includes(Number(product.categoryId)));
		} else {
			this.sortedProducts = this.products;
		}
		this.sortProducts(this.sortedProducts);
	}
}