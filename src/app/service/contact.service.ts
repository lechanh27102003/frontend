import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact'; // Make sure to define this model based on your backend schema

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://plantique-api.onrender.com/api/contacts'; // Adjust the port and route as necessary

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }
  updateContact(contactId: string, contactData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${contactId}`, contactData);
  }
  

  createContact(contactData: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contactData);
  }
}
