import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCartModule } from './product-cart/product-cart.module';
import { ProductCatalogueModule } from './product-catalogue/product-catalogue.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductSuccessComponent } from './product-success/product-success.component';
import { CheckoutService } from './service/checkout.service';

@NgModule({
  declarations: [
    ProductCatalogueComponent,
    ProductCartComponent,
    ProductCheckoutComponent,
    ProductSuccessComponent,
  ],
  exports: [
    ProductCatalogueComponent,
    ProductCartComponent,
    ProductCheckoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductCartModule,
    ProductCatalogueModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService, CheckoutService],
})
export class ProductStoreModule {}
