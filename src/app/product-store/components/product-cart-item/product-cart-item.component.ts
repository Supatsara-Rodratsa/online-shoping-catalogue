import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.component.html',
  styleUrls: ['./product-cart-item.component.css'],
})
export class ProductCartItemComponent {
  @Input()
  selectedProduct!: Product;
  @Input()
  quantity = 0;
  @Input()
  isDisableAnimation = false;

  constructor(private productStoreService: ProductStoreService) {}

  handleAddCartItem(clicked: boolean) {
    if (clicked && this.selectedProduct) {
      this.productStoreService.addCartItem(this.selectedProduct);
    }
  }

  handleRemoveCartItem(clicked: boolean) {
    if (clicked && this.selectedProduct) {
      this.productStoreService.removeCartItem(this.selectedProduct);
    }
  }
}
