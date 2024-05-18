import { EventEmitter, Injectable } from "@angular/core";
import { ProductClient } from "../../components/models/product-client";
import { Feedback } from "../../components/models/feedback-client";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class ProductCLientService {
	constructor(private http: HttpClient) { }
	apiUrl = 'http://localhost:3002/api/products';

	getProducts(categoryId: number) {
		if (Number(categoryId) === 0)
			return this.http.get(`${this.apiUrl}/getall/0`);
		else
			return this.http.get(`${this.apiUrl}/getall/${categoryId}`);
	}

	getProductById(productId : string) {
        return this.http.get<any>(`${this.apiUrl}/${productId}`);
      }

	Feedback(feedbackObject: any): Observable<any> {
		return this.http.post(`${this.apiUrl}/feedback`, feedbackObject);
	}

	getFeedbacksByProductId(productId: any): Observable<any[]> {
		return this.http.get<any[]>(`${this.apiUrl}/getAllFeedbackById/${productId}`).pipe(
			map(response => {
				return response;
			})
		);
	}

	getRelatedProducts(categoryId: number) {
		return this.http.get(`${this.apiUrl}/relatedProduct/${categoryId}`);
	}
}