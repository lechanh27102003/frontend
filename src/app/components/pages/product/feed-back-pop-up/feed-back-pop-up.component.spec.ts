import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackPopUpComponent } from './feed-back-pop-up.component';

describe('FeedBackPopUpComponent', () => {
  let component: FeedBackPopUpComponent;
  let fixture: ComponentFixture<FeedBackPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedBackPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedBackPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
