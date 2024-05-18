import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3002/api/categories';
  categoryId !: number;
  updateTitle : EventEmitter<any> = new EventEmitter<any>();
  getListCategory():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getCategoryId(id : number) :Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
