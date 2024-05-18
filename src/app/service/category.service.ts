import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://plantique-api.onrender.com/api/categories';
  categoryId !: number;
  updateTitle : EventEmitter<any> = new EventEmitter<any>();
  getListCategory():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getCategoryId(id : number) :Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
