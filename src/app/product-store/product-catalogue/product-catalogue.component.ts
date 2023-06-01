import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

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

  filterProducts$;
  currentSelectedCategory = 'all';
  currentSearchKeyword = '';
  highlightText = '';
  placeholder = 'Search';
  currentPage = 1;

  constructor(private productService: ProductService) {
    this.filterAllProducts();
    this.filterProducts$ = this.productService.getAllFilterProducts();
  }

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
    this.filterAllProducts();
  }

  getSearchItem(searchKey: string) {
    this.highlightText = searchKey;
    this.currentSearchKeyword = searchKey.length > 3 ? searchKey : '';
    if (searchKey.length > 3) this.clearCurrentPage();
    this.filterAllProducts();
  }

  filterAllProducts() {
    this.productService.filterProducts(
      this.currentSelectedCategory,
      this.currentSearchKeyword,
      { pageSize: this.itemsPerPage, currentPage: this.currentPage },
    );
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
    this.filterAllProducts();
  }

  clearCurrentPage() {
    this.currentPage = 1;
  }
}
