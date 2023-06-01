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

  @Input()
  itemsPerPage = 5;

  @Output()
  handleAddingProductToCart = new EventEmitter<Product>();

  currentSelectedCategory = 'all';
  currentSearchKeyword = '';
  highlightText = '';
  placeholder = 'Search';
  currentPage = 1;

  addProductToCart(product: Product) {
    this.handleAddingProductToCart.emit(product);
  }

  getSelectedTab(selectedTab: string) {
    this.currentSelectedCategory = selectedTab;
    this.updatePlaceholder();
    this.clearCurrentPage();
    this.highlightText =
      this.currentSearchKeyword.length > 3
        ? this.currentSearchKeyword
        : this.highlightText;
  }

  getSearchItem(searchKey: string) {
    this.highlightText = searchKey;
    this.currentSearchKeyword = searchKey.length > 3 ? searchKey : '';
    if (searchKey.length > 3) this.clearCurrentPage();
  }

  updatePlaceholder() {
    if (this.currentSelectedCategory && this.currentSelectedCategory != 'all') {
      this.placeholder = `Filter ${this.currentSelectedCategory} product by keyword`;
    } else {
      this.placeholder = 'Search';
    }
  }

  handlePaginationOnChanged(currentPage: number) {
    this.currentPage = currentPage;
  }

  clearCurrentPage() {
    this.currentPage = 1;
  }
}
