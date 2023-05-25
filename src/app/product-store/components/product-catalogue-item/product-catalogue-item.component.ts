import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-product-catalogue-item',
  templateUrl: './product-catalogue-item.component.html',
  styleUrls: ['./product-catalogue-item.component.css'],
})
export class ProductCatalogueItemComponent {
  @Input()
  product: Product | null = null;

  constructor(private productStoreService: ProductStoreService) {}

  handleAddCartItem(clicked: boolean) {
    if (clicked && this.product) {
      this.productStoreService.addCartItem(this.product);
    }
  }
}
