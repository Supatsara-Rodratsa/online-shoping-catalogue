import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogueComponent } from './product-catalogue.component';
import { ProductStoreService } from '../../services/product-store.service';
import { ProductCatalogueItemComponent } from '../product-catalogue-item/product-catalogue-item.component';

describe('ProductCatalogueComponent', () => {
  let component: ProductCatalogueComponent;
  let fixture: ComponentFixture<ProductCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCatalogueComponent, ProductCatalogueItemComponent],
      providers: [ProductStoreService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
