import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart, Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent {
  @Input()
  allCartItems: Cart[] = [];

  @Input()
  totalPrice = 0;

  @Output()
  handleAddingProductToCart = new EventEmitter<Product>();

  @Output()
  handleRemovingProductFromCart = new EventEmitter<Product>();

  @Output()
  clearAllCartItems = new EventEmitter<void>();

  addProductToCart(product: Product) {
    this.handleAddingProductToCart.emit(product);
  }

  removeProductFromCart(product: Product) {
    this.handleRemovingProductFromCart.emit(product);
  }

  clearCartItems() {
    this.clearAllCartItems.emit();
  }
}
