import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStoreComponent } from './product-store.component';
import { ProductCatalogueComponent } from './components/product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductCatalogueItemComponent } from './components/product-catalogue-item/product-catalogue-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

describe('ProductStoreComponent', () => {
  let component: ProductStoreComponent;
  let fixture: ComponentFixture<ProductStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductStoreComponent,
        ProductCatalogueComponent,
        ProductCartComponent,
        ProductCatalogueItemComponent,
        ProductDetailsComponent,
      ],
      imports: [CommonModule, SharedModule],
    });
    fixture = TestBed.createComponent(ProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
