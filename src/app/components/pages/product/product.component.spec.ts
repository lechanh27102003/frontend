import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClientComponent } from './product.component';

describe('PhuongThucThanhToanComponent', () => {
  let component: ProductClientComponent;
  let fixture: ComponentFixture<ProductClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
