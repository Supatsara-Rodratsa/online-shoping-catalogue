import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input()
  isCheckout = false;

  @Output()
  handleAddingProductToCart = new EventEmitter<Product>();

  @Output()
  handleRemovingProductFromCart = new EventEmitter<Product>();

  @Output()
  clearAllCartItems = new EventEmitter<void>();

  constructor(private router: Router) {}

  addProductToCart(product: Product) {
    this.handleAddingProductToCart.emit(product);
  }

  removeProductFromCart(product: Product) {
    this.handleRemovingProductFromCart.emit(product);
  }

  clearCartItems() {
    this.clearAllCartItems.emit();
  }

  routeToCheckout() {
    const routePath = this.isCheckout ? '' : 'checkout';
    this.router.navigate([routePath]);
  }

  routeToShopping() {
    this.router.navigate(['']);
  }
}
