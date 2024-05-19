import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../../../../service/contact.service';
import { Contact } from '../../../../../../models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | undefined;
  responseMessage: string = '';

  constructor(private route: ActivatedRoute, private contactService: ContactService) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    console.log('Contact ID from route:', contactId); // Log the contact ID

    if (contactId) {
      this.contactService.getContactById(contactId).subscribe({
        next: (response: any) => {
          console.log('Contact fetched:', response); // Log the fetched contact
          this.contact = response.data; // Correctly assign the contact data
          this.responseMessage = this.contact?.responseMessage ?? ''; // Initialize responseMessage
        },
        error: (err) => {
          console.error('Error fetching contact details:', err); // Log any error fetching contact details
        }
      });
    } else {
      console.error('No contact ID provided'); // Log if no contact ID is provided
    }
  }

  onUpdateStatus(): void {
    if (this.contact?._id) {
      console.log('Updating contact ID:', this.contact._id); // Log the contact ID being updated
      this.contactService.updateContact(this.contact._id, {
        status: 'Responded',
        responseDate: new Date(),
        responseMessage: this.responseMessage
      }).subscribe({
        next: () => {
          console.log('Contact status updated'); // Log successful update
          if (this.contact) {
            this.contact.status = 'Responded';
            this.contact.responseDate = new Date();
          }
        },
        error: (err) => {
          console.error('Error updating contact status:', err); // Log any error updating contact status
        }
      });
    } else {
      console.error('Invalid contact ID'); // Log if contact ID is invalid
    }
  }
}