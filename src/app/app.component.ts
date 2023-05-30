import { Component, OnInit } from '@angular/core';
import productMocks from 'src/assets/mocks/products.json';
import { ProductStoreService } from './product-store/services/product-store.service';
import { Observable } from 'rxjs';
import { Product } from './interfaces/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'online-shop-catalogue';
  allProducts$ = new Observable<Product[]>();

  constructor(public productStoreService: ProductStoreService) {
    this.productStoreService.setAllProducts(productMocks);
  }

  ngOnInit(): void {
    this.allProducts$ = this.productStoreService.getAllProducts();
  }
}
