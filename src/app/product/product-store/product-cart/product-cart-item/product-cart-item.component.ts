import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

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

  @Output()
  addProductToCart = new EventEmitter<Product>();

  @Output()
  removeProductFromCart = new EventEmitter<Product>();

  handleAddCartItem() {
    this.addProductToCart.emit(this.selectedProduct);
  }

  handleRemoveCartItem() {
    this.removeProductFromCart.emit(this.selectedProduct);
  }
}
