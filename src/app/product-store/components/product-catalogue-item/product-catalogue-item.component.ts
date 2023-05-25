import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart, Product } from 'src/app/interfaces/product.interface';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-product-catalogue-item',
  templateUrl: './product-catalogue-item.component.html',
  styleUrls: ['./product-catalogue-item.component.css'],
})
export class ProductCatalogueItemComponent {
  @Input()
  product: Product | null = null;

  @Output()
  updateSelectedCatalogueItems = new EventEmitter<Cart[]>();

  constructor(private productStoreService: ProductStoreService) {}

  handleAddCartItem(clicked: boolean) {
    if (clicked && this.product) {
      this.productStoreService.addCartItem(this.product);
      // this.updateSelectedCatalogueItems.emit(
      //   this.productStoreService.getAllCartItems(),
      // );
    }
  }
}
