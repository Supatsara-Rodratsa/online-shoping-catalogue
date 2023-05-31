import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css'],
})
export class ProductCatalogueComponent {
  @Input()
  allProducts: Product[] = [];

  @Output()
  handleAddingProductToCart = new EventEmitter<Product>();

  currentTab = '';

  addProductToCart(product: Product) {
    this.handleAddingProductToCart.emit(product);
  }

  getSelectedTab(selectedTab: string) {
    this.currentTab = selectedTab;
  }
}
