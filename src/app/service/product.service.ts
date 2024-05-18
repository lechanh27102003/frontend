import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private http: HttpClient) { }
	productID: any;
	totalStar: any;
	product: any;
	countFb: any;
	listProduct : any;
	updateProduct: EventEmitter<any> = new EventEmitter<any>();
	searchProduct: EventEmitter<any> = new EventEmitter<any>();

	apiUrl = 'https://plantique-api.onrender.com/api/products';

	addNewProduct(productData: any): Observable<any> {
		return this.http.post(`${this.apiUrl}/addnew`, productData);
	}

	getProductsByStatus(mode: any): Observable<any> {
		return this.http.get(`${this.apiUrl}/getbystatus/${mode}`);
	}

	uploadImage(formData: FormData) {
		return this.http.post('https://plantique-api.onrender.com/upload', formData);
	}

	uploadProduct(id: any, product: any) {
		return this.http.put(`${this.apiUrl}/uploadProduct/${id}`, product);
	}

	updateRating(id: any, product: any) {
		return this.http.put(`${this.apiUrl}/uploadProduct/${id}`, product);
	}

	deleteProduct(id: any) {
		return this.http.delete(`${this.apiUrl}/deleteProduct/${id}`);
	}

	getSearchProduct(searchContent: string) {
		return this.http.get<any[]>(`${this.apiUrl}/search/${searchContent.toString()}`);
	}
}
