import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  private products: Product[] = [];

  public getAllProducts(): Product[] {
    return this.products;
  }

  public setAllProducts(products: Product[]): void {
    this.products = products;
  }
}
