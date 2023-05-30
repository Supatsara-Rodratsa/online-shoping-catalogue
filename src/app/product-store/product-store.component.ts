import { Component, Input, OnInit } from '@angular/core';
import { ProductStoreService } from './services/product-store.service';
import { Cart, Product } from '../interfaces/product.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
export class ProductStoreComponent implements OnInit {
  @Input()
  allProducts: Product[] = [];

  totalPrice$ = of(0);
  allCartItems$ = of([] as Cart[]);

  constructor(private productStoreService: ProductStoreService) {}

  ngOnInit(): void {
    if (this.allProducts) {
      this.productStoreService.setAllProducts(this.allProducts);
      this.totalPrice$ = this.productStoreService.getTotalPrice();
      this.allCartItems$ = this.productStoreService.getAllCartItemsObservable();
    }
  }
}
