import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuccessComponent } from './product-success.component';

describe('ProductSuccessComponent', () => {
  let component: ProductSuccessComponent;
  let fixture: ComponentFixture<ProductSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSuccessComponent],
    });
    fixture = TestBed.createComponent(ProductSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
