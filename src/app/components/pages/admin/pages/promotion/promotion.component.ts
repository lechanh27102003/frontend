import { Component, OnInit } from '@angular/core';
import { PromotionPopupService } from '../../../../../service/promotion-popup.service';
import { CreateCampaignPopupService } from './create-campaign-popup.service';
import { CreateCodePopupService } from './create-code-popup.service';
import { PromotionService } from '../../../../../service/promotion.service';
import { ProductCLientService } from '../../../../../service/client-service/product-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  codes: any[] = [];
  selectedCode: any = {};
  editCodeMode: boolean = false;
  editCampaignMode: boolean = false;
  showDetails: boolean = false;
  productId!: string;
  product: any = {};
  campaigns: any[] = [];
  selectedCampaign: any = {};

  showCodeTable: boolean = true; // Hiển thị bảng code promotion
  showCampaignTable: boolean = false; // Ẩn bảng campaign promotion ban đầu
  codeBtnActive: boolean = true; // Biến để kiểm tra trạng thái nút Code Promotion
  campaignBtnActive: boolean = false;

  constructor(
    public popupService: PromotionPopupService,
    public createCampaignPopupService: CreateCampaignPopupService,
    public createCodePopupService: CreateCodePopupService,
    private promotionService: PromotionService,
    private route: ActivatedRoute,
    private productService: ProductCLientService,
  ) {}

  ngOnInit() {
    this.loadCodes();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam !== null ? idParam : '';
    this.loadCampaigns();
    
  }

  loadCodes() {
    this.promotionService.getAllCodes().subscribe(data => {
      this.codes = data;
      this.showCodeTable = true;
    this.showCampaignTable = false;
    this.codeBtnActive = true;
    this.campaignBtnActive = false;

    });
  }

  async deleteCode(code: any) {
    const confirmation = confirm('Are you sure you want to delete this promotion?');
    if (confirmation) {
      try {
        await this.promotionService.deleteCode(code._id).toPromise();
        this.loadCodes();
      } catch (error) {
        console.error('Error deleting code:', error);
      }
    }
  }

  viewDetails(code: any) {
    this.selectedCode = { ...code }; 
    this.openModal('promotionModal');
    this.editCodeMode = true;
    this.showDetails = true;
  }

  openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  closeModal() {
    const modal = document.getElementById('promotionModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.selectedCode = null;
  }

  saveChanges() {
    if (this.editCodeMode) {
      this.promotionService.updateCode(this.selectedCode).subscribe(
        (response) => {
          console.log('Updated successfully:', response);
          this.closeModal();
          this.loadCodes(); // Cập nhật lại danh sách sau khi lưu thành công
        },
        (error) => {
          console.error('Error updating code:', error);
        }
      );
    }
    this.editCodeMode = false;
  }
  openCreateCampaign() {
    this.createCampaignPopupService.openCreateCampaignPopup();
    this.closePopup();
  }

  openCreateCode() {
    this.createCodePopupService.openCreateCodePopup(); 
    this.closePopup();
  }

  closePopup() {
    this.popupService.closePopupPromo();
  }

  openPopup() {
    this.popupService.openPopupPromo();
  }

  loadCampaigns() {
    this.promotionService.getAllCampaigns().subscribe(data => {
      this.campaigns = data;
      this.showCodeTable = false;
      this.showCampaignTable = true;
      this.codeBtnActive = false;
    this.campaignBtnActive = true;

    });
  }

  async deleteCampaign(campaign: any) {
    const confirmation = confirm('Are you sure you want to delete this campaign?');
    if (confirmation) {
      try {
        await this.promotionService.deleteCampaign(campaign._id).toPromise();
        this.loadCampaigns();
      } catch (error) {
        console.error('Error deleting campaign:', error);
      }
    }
  }

  viewDetailsCampaign(campaign: any) {
    this.selectedCampaign = campaign;
    this.openModal('campaignModal');
    this.editCampaignMode = true;
  }

 // Phương thức lưu các thay đổi sau khi chỉnh sửa chiến dịch
 saveChangesCampaign() {
  if (this.editCampaignMode) {
    this.promotionService.updateCampaign(this.selectedCampaign).subscribe(
      (response) => {
        console.log('Updated successfully:', response);
        this.closeCampaignModal(); // Đóng modal sau khi cập nhật thành công
        this.cancelEdit(); // Đặt lại trạng thái chỉnh sửa
      },
      (error) => {
        console.error('Error updating campaign:', error);
      }
    );
  }
  this.editCampaignMode = false;
}

  cancelEdit() {
    this.editCampaignMode = false;
    this.selectedCampaign = {};
  }
  closeCampaignModal() {
    const modal = document.getElementById('campaignModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.selectedCampaign = null;
  }
  getStatus(code: any): string {
    const today = new Date();
    const endDate = new Date(code.endDate);
    return endDate < today ? 'Expired' : 'On promotion';
  }
}
