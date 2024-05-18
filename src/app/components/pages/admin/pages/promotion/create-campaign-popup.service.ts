import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCampaignPopupService {
  showCreateCampaign$: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  openCreateCampaignPopup() {
    this.showCreateCampaign$.next(true);
  }

  closeCreateCampaignPopup() {
    this.showCreateCampaign$.next(false);
  }

  saveCampaign(campaignData: any) {
    // Here you can perform any operations like API calls to save the campaign data
    console.log("Saving campaign:", campaignData);
    this.closeCreateCampaignPopup(); // Close the popup after saving
  }
}