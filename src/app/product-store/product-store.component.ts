import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cart, Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
export class ProductStoreComponent implements OnInit {
  @Input()
  allProducts: Product[] = [];

  totalPrice$ = of(0);
  allCartItems$ = new Observable<Cart[]>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.allCartItems$ = this.productService.getAllCartItemsObservable();
    this.totalPrice$ = this.productService.getTotalPriceObservable();
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
