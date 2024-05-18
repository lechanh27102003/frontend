import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../../service/category.service';
import { ProductService } from '../../../../../service/product.service';
import { StatusProduct } from '../../../../models/enum';
import { ProductCLientService } from '../../../../../service/client-service/product-client.service';
import { PromotionService } from '../../../../../service/promotion.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
	products: any[] = [];
	categories: any[] = [];
	showOverlay: boolean = false;
	displayProduct: any[] = [];
	selectedProductIds: string[] = [];
	product: any;
	modeStatus = 0;
	editRowIndex: number = -1;
	isAll = true;
	isNew = false;
	isUpload = false;
	isDelete = false;
	campaigns: any[] = []; // Danh sách các chiến dịch từ PromotionService
	showApplyCampaignModal: boolean = false;
	selectedCampaignId: string = '';
	updateProduct: any;
	updateProductId !: number;

	constructor(private categoryService: CategoryService,
		private productService: ProductService,
		private productClientService: ProductCLientService,
		private promotionService: PromotionService,
	) { }
	
	ngOnInit(): void {
		this.initalize(this.modeStatus);
		this.loadCampaigns();
	}

	initalize(mode: number) {
		this.productService.getProductsByStatus(mode).subscribe({
			next: (data: any[]) => {
				this.products = data;
				this.categoryService.getListCategory().subscribe({
					next: data => {
						this.categories = data;
						this.displayProduct = this.displayProductTable(this.products, this.categories);;
					},
					error: (error) => {

					}
				});
			},
			error: (error) => {
			}
		});
	}
	showPopup: boolean = false;

	onAddProduct(productData: {
		productName: string,
		price: number,
		description: string,
		stock: number,
		image: string,
		categoryId: string,
		discount: number
	}) {
		this.showPopup = true;

		const newProduct = {
			productName: productData.productName,
			price: productData.price,
			description: productData.description,
			status: 1,
			stock: productData.stock,
			deleteDate: "",
			updateDate: "",
			categoryId: Number(productData.categoryId),
			image: productData.image,
			rating: 0,
			discount: productData.discount
		};

		this.addProduct(newProduct).subscribe(
			(response) => {
				console.log('Product added:', response);
				// Do something after successful addition
			},
			(error) => {
				console.error('Error adding product:', error);
				// Handle error
			}
		);
	}

	addProduct(newProduct: any) {
		return this.productService.addNewProduct(newProduct);
	}

	displayProductTable(products: any[], categories: any[]): any[] {
		for (let product of products) {
			for (let category of categories) {
				if (category.categoryId === Number(product.categoryId)) {
					let statusValue;
					switch (product.status) {
						case 1:
							statusValue = StatusProduct[StatusProduct.New];
							break;
						case 2:
							statusValue = StatusProduct[StatusProduct.Uploaded];
							break;
						case 3:
							statusValue = StatusProduct[StatusProduct.Remove];
							break;
					}
					this.displayProduct.push({ product, categoryName: category.categoryName, statusValue });
				}
			}
		}
		return this.displayProduct;
	}

	toggleSelection(productId: string) {
		if (this.selectedProductIds.includes(productId)) {
			this.selectedProductIds = this.selectedProductIds.filter(id => id !== productId);
		} else {
			this.selectedProductIds.push(productId);
		}
	}

	export() {
		for (let id of this.selectedProductIds) {
			this.productClientService.getProductById(id).subscribe({
				next: data => {
					this.product = data;
					this.product.status = StatusProduct.Uploaded;
					this.productService.uploadProduct(id, this.product).subscribe({
						next: data => {
							this.displayProduct = [];
							this.initalize(this.modeStatus);
						}
					});
				}
			})
		}
	}


	remove(id: any) {
		this.productClientService.getProductById(id).subscribe({
			next: data => {
				this.product = data;
				this.product.status = StatusProduct.Remove;
				this.productService.uploadProduct(id, this.product).subscribe({
					next: data => {
						this.displayProduct = [];
						this.initalize(this.modeStatus);
					}
				});
			}
		})
	}

	delete(id: any) {
		this.productService.deleteProduct(id).subscribe({
			next: data => {
				this.displayProduct = [];
				this.initalize(3);
			}
		})
	}


	getProductByMode(mode: number) {
		this.displayProduct = [];
		this.initalize(mode);
		switch (mode) {
			case 0:
				this.isAll = true;
				this.isNew = false;
				this.isUpload = false;
				this.isDelete = false;
				break;
			case 1:
				this.isAll = false;
				this.isNew = true;
				this.isUpload = false;
				this.isDelete = false;
				break;
			case 2:
				this.isAll = false;
				this.isNew = false;
				this.isUpload = true;
				this.isDelete = false;
				break;
			case 3:
				this.isAll = false;
				this.isNew = false;
				this.isUpload = false;
				this.isDelete = true;
				break;
			default:
				break;
		}
	}

	toggleEditMode(index: number) {
		this.editRowIndex = this.editRowIndex === index ? -1 : index;
	}

	saveChanges(product: any) {
		this.productService.uploadProduct(this.updateProductId, product).subscribe({
			next: data => {
				this.displayProduct = [];
				this.initalize(this.modeStatus);
			}
		});
		this.editRowIndex = -1;
	}

	getButtonClass(buttonType: string): string {
		switch (buttonType) {
			case 'All':
				return this.isAll ? 'Activated' : 'Notactivated';
			case 'New':
				return this.isNew ? 'Activated' : 'Notactivated';
			case 'Upload':
				return this.isUpload ? 'Activated' : 'Notactivated';
			case 'Delete':
				return this.isDelete ? 'Activated' : 'Notactivated';
			default:
				return 'Notactivated';
		}
	}

	showPopupUpdate = false;
	onUpdateProduct(productData: {
		productName: string,
		price: number,
		description: string,
		stock: number,
		image: string,
		categoryId: string,
		discount: number
	}) {
		this.showPopupUpdate = true;

		const updateProduct = {
			productName: productData.productName,
			price: productData.price,
			description: productData.description,
			status: this.updateProduct.product.status,
			stock: productData.stock,
			deleteDate: "",
			updateDate: "",
			categoryId: Number(productData.categoryId),
			image: productData.image,
			rating: this.updateProduct.product.rating,
			discount: productData.discount
		};

		this.saveChanges(updateProduct);
	}

	// Parent Component Logic
	openUpdatePopup(product: any) {
		// Assign the product to updateProduct only if it's defined
		if (product) {
			this.updateProduct = product;
			this.showPopupUpdate = true;
			this.updateProductId = product.product._id;
		}
	}

	closeUpdatePopup() {
		this.showPopupUpdate = false;
	}

	// Hàm gọi API để load danh sách chiến dịch
	loadCampaigns() {
		this.promotionService.getAllCampaignsForProduct().subscribe({
			next: (data: any[]) => {
				this.campaigns = data;
			},
			error: (error) => {
				console.error('Error loading campaigns:', error);
			}
		});
	}

	// Hàm áp dụng chiến dịch
	applyCampaign() {
		this.showApplyCampaignModal = true;
	}

	// Hàm áp dụng các chiến dịch đã chọn cho các sản phẩm đã chọn
	applyCampaignsToSelectedProducts() {
		// Lấy danh sách các productId của các sản phẩm đã được chọn
		const selectedProductIds = this.selectedProductIds;

		// Kiểm tra xem có sản phẩm nào được chọn không
		if (selectedProductIds.length === 0) {
			console.error('No product selected.');
			return;
		}

		// Lấy campaignId được chọn từ giao diện người dùng
		const selectedCampaignId = this.selectedCampaignId;

		// Gọi hàm áp dụng chiến dịch từ ProductService hoặc PromotionService cho danh sách sản phẩm đã chọn
		this.promotionService.applyCampaignToProducts(selectedCampaignId, selectedProductIds).subscribe({
			next: (response) => {
				console.log('Campaign applied to selected products:', response);
				// Cập nhật thông tin sản phẩm hoặc hiển thị thông báo thành công
			},
			error: (error) => {
				console.error('Error applying campaign:', error);
				// Hiển thị thông báo lỗi cho người dùng
			}
		});

		this.showApplyCampaignModal = false;
	}
	closeCampaignModal() {
        this.showApplyCampaignModal = false;
    }
}


