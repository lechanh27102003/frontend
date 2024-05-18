import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSachBaoMatComponent } from './chinh-sach-bao-mat.component';

describe('ChinhSachBaoMatComponent', () => {
  let component: ChinhSachBaoMatComponent;
  let fixture: ComponentFixture<ChinhSachBaoMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChinhSachBaoMatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChinhSachBaoMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
