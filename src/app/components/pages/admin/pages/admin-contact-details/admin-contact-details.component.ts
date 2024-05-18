import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../../../../service/contact.service';
import { Contact } from '../../../../../models/contact';

@Component({
  selector: 'app-admin-contact-details',
  templateUrl: './admin-contact-details.component.html',
  styleUrls: ['./admin-contact-details.component.css']
})
export class AdminContactDetailsComponent implements OnInit {
  contact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.getContactDetails();
  }
  getContactDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Contact ID:', id); // Confirm the ID is correct
    if (!id) {
      console.error('Contact ID is missing');
      this.router.navigate(['/admin/contact']);
      return;
    }
  
    this.contactService.getContactById(id).subscribe(
      (response: any) => { // It's good to use a more specific type if possible
        console.log('Contact details:', response);
        if (response && response.data) { // Make sure the data property exists
          this.contact = response.data; // Set this.contact to response.data instead of response
          console.log('Contact assigned:', this.contact);
        } else {
          console.error('No contact data received:', response);
        }
      },
      (error) => {
        console.error('Error fetching contact details:', error);
      }
    );
  }    
  
  markAsResponsed(): void {
    const updatedContact = {
      responseDate: new Date().toISOString(),  // Ensure consistent date format
      status: 'Responsed'
    };
  
    this.contactService.updateContact(this.contact._id, updatedContact).subscribe(
      (response) => {
        console.log('Contact updated:', response);
        this.contact = response.data; // Assuming your backend returns the updated contact
      },
      (error) => {
        console.error('Error updating contact:', error);
      }
    );
  }
  
  
  formatDateString(dateString?: Date): string {
    if (!dateString) {
      return '-';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('vn-VN', { year: 'numeric', month: 'short', day: '2-digit' });
  }
}
