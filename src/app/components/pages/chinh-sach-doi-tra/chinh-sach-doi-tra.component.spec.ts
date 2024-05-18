import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhSachDoiTraComponent } from './chinh-sach-doi-tra.component';

describe('ChinhSachDoiTraComponent', () => {
  let component: ChinhSachDoiTraComponent;
  let fixture: ComponentFixture<ChinhSachDoiTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChinhSachDoiTraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChinhSachDoiTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
