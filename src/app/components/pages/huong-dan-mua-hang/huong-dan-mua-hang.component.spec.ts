import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuongDanMuaHangComponent } from './huong-dan-mua-hang.component';

describe('HuongDanMuaHangComponent', () => {
  let component: HuongDanMuaHangComponent;
  let fixture: ComponentFixture<HuongDanMuaHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuongDanMuaHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuongDanMuaHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
