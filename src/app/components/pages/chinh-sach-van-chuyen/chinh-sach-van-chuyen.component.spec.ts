import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSachVanChuyenComponent } from './chinh-sach-van-chuyen.component';

describe('ChinhSachVanChuyenComponent', () => {
  let component: ChinhSachVanChuyenComponent;
  let fixture: ComponentFixture<ChinhSachVanChuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChinhSachVanChuyenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChinhSachVanChuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
