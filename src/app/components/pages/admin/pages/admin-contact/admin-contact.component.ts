import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../../service/contact.service';
import { Contact } from '../../../../../models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}
  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (response: any) => {
        if (Array.isArray(response.data)) {
          this.contacts = response.data;
        } else {
          console.error('Contacts data is not an array:', response.data);
        }
      },
      
    });
  }

  openContactDetails(contactId: string | undefined): void {
    if (contactId) {
      this.router.navigate(['/admin/admin-contact-details', contactId]);
    } else {
      console.error('Invalid contact ID');
    }
  }
  
  formatDateString(dateString?: Date): string {
    if (!dateString) {
      return '-'; // Return a placeholder or an empty string if the date is undefined
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN', { year: 'numeric', month: 'short', day: '2-digit' });
  }
  
  
}
