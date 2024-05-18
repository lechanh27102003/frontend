import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-coupon-card',
  templateUrl: './coupon-card.component.html',
  styleUrls: ['./coupon-card.component.css']
})
export class CouponCardComponent {
  codes: any[] = []; // Array to store codes

  constructor(private http: HttpClient, private toast: NgToastService) {
    this.loadCodes();
  }

  async loadCodes() {
    try {
      const response: any = await this.http.get('https://plantique-api.onrender.com/api/codes').toPromise();
      if (Array.isArray(response)) {
        // Take the first 3 codes or all codes if less than 3
        const codesToDisplay = response.slice(0, 3);
        this.codes = codesToDisplay;
      }
    } catch (error) {
      console.error(error);
    }
  }

  copyCode(codeToCopy: string) {
    navigator.clipboard.writeText(codeToCopy)
      .then(() => {
        this.toast.success({ detail: 'Code copied', summary: 'SUCCESS', duration: 5000 });
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
        this.toast.error({ detail: 'Failed to copy code. Please try again.', summary: 'ERROR', sticky: true });
      });
  }
}
