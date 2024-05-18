import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateCampaignPopupService } from '../create-campaign-popup.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  @Output() campaignCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>(); // Thêm EventEmitter cho nút cancel
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>(); // Thêm EventEmitter cho nút close
  showCreateCampaign: boolean = false;

  newCampaign: any = {};

  constructor(public popupService: CreateCampaignPopupService, private http: HttpClient) {}

  ngOnInit(): void {
    this.popupService.showCreateCampaign$.subscribe((show) => {
      this.showCreateCampaign = show;
    });
  }

  saveCampaign() {
    this.http.post<any>('https://plantique-api.onrender.com/api/campaigns', this.newCampaign)
    .subscribe((data) => {
      console.log("Campaign saved:", data);
      this.campaignCreated.emit(data);
      this.newCampaign = {}; 
    }, (error) => {
      console.error("Error saving campaign:", error);
    });
  }

  cancelCampaign() {
    // Xóa thông tin đang nhập
    this.newCampaign = {};

    // Gửi sự kiện khi nút cancel được nhấn
    this.cancelClicked.emit();
  }

  closePopupWindow() {
    // Gửi sự kiện khi nút close được nhấn
    this.closePopup.emit();
    this.showCreateCampaign = false; // Đặt giá trị của showCreateCampaign thành false để ẩn pop-up
  }

  openPopup() {
    // Mở lại pop-up
    this.showCreateCampaign = true;
  }
}