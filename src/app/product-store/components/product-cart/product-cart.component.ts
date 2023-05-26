import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/interfaces/product.interface';
import { ProductStoreService } from '../../services/product-store.service';

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

  constructor(private productStoreService: ProductStoreService) {}

  clearCartItems() {
    this.productStoreService.clearCartItems();
  }
}
