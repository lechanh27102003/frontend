import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../../service/contact.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup; // Notice the ! sign which is the definite assignment assertion

  constructor(private contactService: ContactService, private toast: NgToastService) {
    this.createForm();
  }

  createForm() {
    this.contactForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'phone': new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'message': new FormControl('', Validators.required)
    });
  }

onSubmit() {
  if (this.contactForm.valid) {
    this.contactService.createContact(this.contactForm.value).subscribe(
      response => {
        this.toast.success({
          detail: 'Your message has been submitted successfully!',
          summary: 'Success',
          duration: 5000
        });
        this.contactForm.reset(); // Reset the form after successful submission
      },
      error => {
        this.toast.error({
          detail: 'Failed to send message. Please try again.',
          summary: 'Error',
          duration: 5000
        });
      }
    );
  } else {
    this.toast.warning({
      detail: 'Please fill out the form correctly.',
      summary: 'Warning',
      duration: 5000
    });
  }
}

}
