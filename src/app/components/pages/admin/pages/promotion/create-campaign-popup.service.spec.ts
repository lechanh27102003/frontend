import { TestBed } from '@angular/core/testing';

import { CreateCampaignPopupService } from './create-campaign-popup.service';

describe('CreateCampaignPopupService', () => {
  let service: CreateCampaignPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCampaignPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
