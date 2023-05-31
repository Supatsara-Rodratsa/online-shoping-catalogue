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
  currentSearchKey = '';
  highlightText = '';
  placeholder = 'Search';

  addProductToCart(product: Product) {
    this.handleAddingProductToCart.emit(product);
  }

  getSelectedTab(selectedTab: string) {
    this.currentTab = selectedTab;
    this.updatePlaceholder();
  }

  getSearchItem(searchKey: string) {
    this.highlightText = searchKey;
    this.currentSearchKey = searchKey.length > 3 ? searchKey : '';
  }

  updatePlaceholder() {
    if (this.currentTab && this.currentTab != 'all') {
      this.placeholder = `Filter ${this.currentTab} product by keyword`;
    } else {
      this.placeholder = 'Search';
    }
  }
}
