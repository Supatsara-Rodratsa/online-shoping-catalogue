import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FilterProduct,
  Product,
  Tab,
} from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css'],
})
export class ProductCatalogueComponent {
  @Input()
  categories: Tab[] = [];

  @Input()
  filterProducts: FilterProduct | null = null;

  @Input()
  itemsPerPage = 5;

  @Input()
  currentSelectedCategory = 'all';

  @Input()
  currentSearchKeyword = '';

  @Input()
  placeholder = '';

  @Input()
  currentPage = 1;

  @Output()
  handleAddingProductToCart = new EventEmitter<Product>();

  @Output()
  updateSelectedCategory = new EventEmitter<string>();

  @Output()
  updateKeyword = new EventEmitter<string>();

  @Output()
  updatePageChanged = new EventEmitter<number>();

  addProductToCart(product: Product) {
    this.handleAddingProductToCart.emit(product);
  }

  getSelectedTab(selectedTab: string) {
    this.updateSelectedCategory.emit(selectedTab);
  }

  getSearchItem(searchKey: string) {
    this.updateKeyword.emit(searchKey);
  }

  handlePaginationOnChanged(currentPage: number) {
    this.updatePageChanged.emit(currentPage);
  }
}
