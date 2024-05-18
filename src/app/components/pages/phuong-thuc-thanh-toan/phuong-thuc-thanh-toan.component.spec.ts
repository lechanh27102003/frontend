import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongThucThanhToanComponent } from './phuong-thuc-thanh-toan.component';

describe('PhuongThucThanhToanComponent', () => {
  let component: PhuongThucThanhToanComponent;
  let fixture: ComponentFixture<PhuongThucThanhToanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhuongThucThanhToanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhuongThucThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
