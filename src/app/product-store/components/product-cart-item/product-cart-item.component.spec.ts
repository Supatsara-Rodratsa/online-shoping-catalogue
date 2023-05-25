import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartItemComponent } from './product-cart-item.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ProductCartItemComponent', () => {
  let component: ProductCartItemComponent;
  let fixture: ComponentFixture<ProductCartItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCartItemComponent, ProductDetailsComponent],
      imports: [CommonModule, SharedModule],
    });
    fixture = TestBed.createComponent(ProductCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const selectedProduct = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'test',
      image: 'image',
      category: 'test',
    };

    component.selectedProduct = selectedProduct;
    fixture.detectChanges();
    // expect(component).toBeTruthy();
    expect(component.selectedProduct).toBe(selectedProduct);
  });
});
