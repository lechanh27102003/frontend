import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  loginSuccessEvent: EventEmitter<any> = new EventEmitter<any>();
  private baseUrl = 'http://localhost:3002/api/auth'; 

  constructor(private http: HttpClient) {}

  signIn(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Thông báo cho các component khác biết đã đăng nhập thành công
        this.loginSuccessEvent.emit(response.user);

        return response;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  signUp(userDetails: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, userDetails).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getCurrentUser(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3002/api/users/${userId}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.logoutEvent.emit();
  }
  sendEmailService(email: string){
    return this.http.post<any>(`${this.baseUrl}/send-email`, {email:email}).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetObj).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
