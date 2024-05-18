import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateCodePopupService } from '../create-code-popup.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.component.html',
  styleUrls: ['./create-code.component.css']
})
export class CreateCodeComponent implements OnInit {
  @Output() codeCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  showCreateCode: boolean = false;
  newCode: any = {};
  discountTypeValue: string = '';

  constructor(public popupService: CreateCodePopupService, 
    private http: HttpClient) {}

  ngOnInit(): void {
    this.popupService.showCreateCode$.subscribe((show) => {
      this.showCreateCode = show;
    });
  }

  saveCode() {
    this.http.post<any>('https://plantique-api.onrender.com/api/codes', this.newCode)
      .subscribe(
        response => {
          console.log('Code saved successfully:', response);
          // Thực hiện các hành động sau khi lưu thành công
        },
        error => {
          console.error('Error saving code:', error);
          // Xử lý lỗi nếu có
        }
      );
      this.closePopupWindow();
  }

  cancelCode() {
    // Xóa thông tin đang nhập
    this.newCode = {};
    // Gửi sự kiện khi nút cancel được nhấn
    this.closePopupWindow();
  }

  closePopupWindow() {
    this.popupService.closeCreateCodePopup();
  }


  // Hàm được gọi khi thay đổi Promotion Type
  onPromotionTypeChange() {
    if (this.newCode.promotionType === 'discountByPercentage') {
      this.newCode.discountType = '%';
      this.discountTypeValue = '%'; // Set discountTypeValue accordingly
    } else if (this.newCode.promotionType === 'discountByAmount') {
      this.newCode.discountType = 'VND';
      this.discountTypeValue = 'VND'; // Set discountTypeValue accordingly
    }
  }
}
