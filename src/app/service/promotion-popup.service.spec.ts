import { TestBed } from '@angular/core/testing';

import { PromotionPopupService } from './promotion-popup.service';

describe('PromotionPopupService', () => {
  let service: PromotionPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
