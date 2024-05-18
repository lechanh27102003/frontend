// blog.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:3002/api/blogs'; // URL của API

  constructor(private http: HttpClient) {}

  // Lấy danh sách blog từ API
  getBlogs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Thêm blog mới vào API
  addBlog(blogData: any): Observable<any> {
    return this.http.post(this.baseUrl, blogData);
  }
  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${blogId}`);
  }

  updateBlog(blogId: string, blogData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${blogId}`, blogData);
  }
  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.baseUrl}/${id}`);
  }
  
}
