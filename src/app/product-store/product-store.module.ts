import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCatalogueItemComponent } from './components/product-catalogue-item/product-catalogue-item.component';
import { ProductStoreService } from './services/product-store.service';
import { ProductStoreComponent } from './product-store.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductCatalogueItemComponent,
    ProductStoreComponent,
  ],
  imports: [CommonModule, SharedModule, HttpClientModule],
  exports: [ProductStoreComponent],
  providers: [ProductStoreService],
})
export class ProductStoreModule {}
