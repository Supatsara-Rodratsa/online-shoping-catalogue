import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCatalogueItemComponent } from './product-catalogue-item.component';

describe('ProductCatalogueItemComponent', () => {
  let component: ProductCatalogueItemComponent;
  let fixture: ComponentFixture<ProductCatalogueItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCatalogueItemComponent],
    });
    fixture = TestBed.createComponent(ProductCatalogueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
