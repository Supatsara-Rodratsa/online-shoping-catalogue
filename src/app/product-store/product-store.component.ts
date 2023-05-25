import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductStoreService } from './services/product-store.service';
import { Product } from '../interfaces/product.interfact';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
export class ProductStoreComponent implements OnInit {
  allProducts: Product[] = [];

  constructor(
    private http: HttpClient,
    private productStoreService: ProductStoreService,
  ) {}

  ngOnInit(): void {
    this.http.get('./assets/mocks/products.json').subscribe(
      (data) => {
        this.productStoreService.setAllProducts(data as Product[]);
        this.allProducts = this.productStoreService.getAllProducts();
        console.log(this.allProducts);
      },
      (error) => {
        console.error('Error fetching JSON file:', error);
      },
    );
  }
}
