import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionPopupService {

  showOverlay = false;

  constructor() {}

  openPopupPromo() {
    this.showOverlay = true; // Hiển thị pop-up
  }

  closePopupPromo() {
    this.showOverlay = false; // Ẩn pop-up
  }
}
