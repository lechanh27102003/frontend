import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCodePopupService {
  showCreateCode$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  openCreateCodePopup() {
    this.showCreateCode$.next(true);
  }

  closeCreateCodePopup() {
    this.showCreateCode$.next(false);
  }
  saveCode(codeData: any) {
    // Thực hiện lưu mã khuyến mãi
    console.log("Saving code:", codeData);
    this.closeCreateCodePopup(); // Đóng pop-up sau khi lưu
  }
}