import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCartModule } from './product-cart/product-cart.module';
import { ProductCatalogueModule } from './product-catalogue/product-catalogue.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductCatalogueComponent, ProductCartComponent],
  exports: [ProductCatalogueComponent, ProductCartComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductCartModule,
    ProductCatalogueModule,
  ],
})
export class ProductStoreModule {}
