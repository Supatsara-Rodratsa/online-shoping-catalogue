import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCartModule } from './product-cart/product-cart.module';
import { ProductCatalogueModule } from './product-catalogue/product-catalogue.module';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../services/product.service';
import { APP_API_ENDPOINT, APP_PAGINATION_PAGE_SIZE } from '../app.setting';
import { PAGE_SIZE, PRODUCT_SERVICE_API } from 'src/settings';

@NgModule({
  declarations: [ProductCatalogueComponent, ProductCartComponent],
  exports: [ProductCatalogueComponent, ProductCartComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductCartModule,
    ProductCatalogueModule,
  ],
  providers: [
    ProductService,
    {
      provide: APP_API_ENDPOINT,
      useValue: PRODUCT_SERVICE_API,
    },
    {
      provide: APP_PAGINATION_PAGE_SIZE,
      useValue: PAGE_SIZE,
    },
  ],
})
export class ProductStoreModule {}
