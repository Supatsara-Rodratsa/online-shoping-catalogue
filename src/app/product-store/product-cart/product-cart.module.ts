import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartItemComponent } from './product-cart-item/product-cart-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductCartItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [ProductCartItemComponent],
})
export class ProductCartModule {}
