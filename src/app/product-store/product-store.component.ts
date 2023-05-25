import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductStoreService } from './services/product-store.service';
import { Cart, Product } from '../interfaces/product.interface';
import { Subscription } from 'rxjs';
import productMocks from 'src/assets/mocks/products.json';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
export class ProductStoreComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  allCartItems: Cart[] = [];
  totalPrice = 0;
  allCartItemsSubscription!: Subscription;
  totalPriceSubscription!: Subscription;

  constructor(private productStoreService: ProductStoreService) {}

  ngOnInit(): void {
    this.productStoreService.setAllProducts(productMocks as Product[]);
    this.allProducts = this.productStoreService.getAllProducts();
    this.subscribeCartItems();
  }

  ngOnDestroy(): void {
    this.allCartItemsSubscription.unsubscribe();
    this.totalPriceSubscription.unsubscribe();
  }

  subscribeCartItems() {
    this.allCartItemsSubscription = this.productStoreService
      .getAllCartItemsObservable()
      .subscribe((value) => (this.allCartItems = value));

    this.totalPriceSubscription = this.productStoreService
      .getTotalPrice()
      .subscribe((value) => (this.totalPrice = value));
  }
}
