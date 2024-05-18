import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private baseUrl = 'https://plantique-api.onrender.com/'; 

  constructor(private http: HttpClient) {}

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/users/${userId}`, userData);
  }

  uploadAvatar(userId: string, file: File): Observable<any> {
    return this.convertFileToBase64(file).pipe(
      switchMap((base64String: string) => {
        const formData = { profilePicture: base64String };
        return this.http.post<any>(`${this.baseUrl}/api/users/${userId}/upload-avatar`, formData);
        // Chỉnh sửa URL để gửi dữ liệu lên máy chủ và nhận phản hồi
      })
    );
  }

  private convertFileToBase64(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        if (base64String) {
          observer.next(base64String);
          observer.complete();
        } else {
          observer.error('Error converting file to Base64: Base64 string is undefined.');
        }
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsDataURL(file); // Đọc file và chuyển đổi thành URL data
    });
  }
}