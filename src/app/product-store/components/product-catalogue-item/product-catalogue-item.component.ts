import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interfact';

@Component({
  selector: 'app-product-catalogue-item',
  templateUrl: './product-catalogue-item.component.html',
  styleUrls: ['./product-catalogue-item.component.css'],
})
export class ProductCatalogueItemComponent {
  @Input()
  product: Product | null = null;
}
