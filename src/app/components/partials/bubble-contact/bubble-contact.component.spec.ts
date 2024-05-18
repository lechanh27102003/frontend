import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleContactComponent } from './bubble-contact.component';
describe('BubbleContactComponent', () => {
  let component: BubbleContactComponent;
  let fixture: ComponentFixture<BubbleContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BubbleContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BubbleContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
