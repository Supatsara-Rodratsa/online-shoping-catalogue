import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCatalogueItemComponent } from './components/product-catalogue-item/product-catalogue-item.component';
import { ProductStoreService } from './services/product-store.service';
import { ProductStoreComponent } from './product-store.component';
import { ProductCartItemComponent } from './components/product-cart-item/product-cart-item.component';
import { ProductCatalogueComponent } from './components/product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductCatalogueItemComponent,
    ProductStoreComponent,
    ProductCartItemComponent,
    ProductCatalogueComponent,
    ProductCartComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    ProductStoreComponent,
    ProductCartComponent,
    ProductCatalogueComponent,
  ],
  providers: [ProductStoreService],
})
export class ProductStoreModule {}
