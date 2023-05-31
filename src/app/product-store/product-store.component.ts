import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
/**
 * Stateful Component
 * Handling everything in service
 */
export class ProductStoreComponent {
  allProducts$;
  totalPrice$;
  allCartItems$;

  constructor(private productService: ProductService) {
    this.allProducts$ = this.productService.getAllProducts();
    this.allCartItems$ = this.productService.getAllCartItems();
    this.totalPrice$ = this.productService.getTotalPrice();
  }

  addCartItem(selectedProduct: Product) {
    this.productService.addCartItem(selectedProduct);
  }

  removeCartItem(selectedProduct: Product) {
    this.productService.removeCartItem(selectedProduct);
  }

  clearCartItems() {
    this.productService.clearCartItems();
  }
}
