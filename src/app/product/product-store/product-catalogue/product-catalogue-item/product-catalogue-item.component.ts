import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-catalogue-item',
  templateUrl: './product-catalogue-item.component.html',
  styleUrls: ['./product-catalogue-item.component.css'],
})
export class ProductCatalogueItemComponent {
  @Input()
  product!: Product;

  @Input()
  searchKeyword = '';

  @Output()
  addProductToCart = new EventEmitter<Product>();

  handleAddCartItem() {
    this.addProductToCart.emit(this.product);
  }
}
