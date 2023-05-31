import { Component, OnInit } from '@angular/core';
import productMocks from 'src/assets/mocks/products.json';
import { Observable } from 'rxjs';
import { Product } from './interfaces/product.interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'online-shop-catalogue';
  allProducts$ = new Observable<Product[]>();

  constructor(public productService: ProductService) {
    this.productService.setAllProducts(productMocks);
  }

  ngOnInit(): void {
    this.allProducts$ = this.productService.getAllProducts();
  }
}
