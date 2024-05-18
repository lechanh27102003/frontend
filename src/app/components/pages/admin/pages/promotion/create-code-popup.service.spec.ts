import { TestBed } from '@angular/core/testing';

import { CreateCodePopupService } from './create-code-popup.service';

describe('CreateCodePopupService', () => {
  let service: CreateCodePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCodePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
