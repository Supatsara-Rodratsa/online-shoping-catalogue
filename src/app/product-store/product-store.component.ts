import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
/**
 * Stateful Component
 * Handling everything in service
 */
export class ProductStoreComponent {
  allProducts$;
  totalPrice$;
  allCartItems$;
  filterProducts$;
  currentSelectedCategory = 'all';
  currentSearchKeyword = '';
  highlightText = '';
  placeholder = 'Search';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private productService: ProductService) {
    this.allProducts$ = this.productService.allProducts;
    this.allCartItems$ = this.productService.allCartItems;
    this.totalPrice$ = this.productService.totalPrice;
    this.filterAllProducts();
    this.filterProducts$ = this.productService.allFilterProducts;
  }

  addCartItem(selectedProduct: Product) {
    this.productService.addCartItem(selectedProduct);
  }

  removeCartItem(selectedProduct: Product) {
    this.productService.removeCartItem(selectedProduct);
  }

  clearCartItems() {
    this.productService.clearCartItems();
  }

  filterAllProducts() {
    this.productService.filterProducts(
      this.currentSelectedCategory,
      this.currentSearchKeyword,
      { pageSize: this.itemsPerPage, currentPage: this.currentPage },
    );
  }

  updateOnSelectedCategoryChanged(selectedCategory: string) {
    this.currentSelectedCategory = selectedCategory;
    this.highlightText =
      this.currentSearchKeyword.length > 3
        ? this.currentSearchKeyword
        : this.highlightText;
    this.initCurrentPage();
    this.filterAllProducts();
  }

  updateOnSearchChanged(keyword: string) {
    this.highlightText = keyword;
    this.currentSearchKeyword = keyword.length > 3 ? keyword : '';
    if (keyword.length > 3) this.initCurrentPage();
    this.filterAllProducts();
  }

  updateOnPageChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.filterAllProducts();
  }

  initCurrentPage() {
    this.currentPage = 1;
  }

  updatePlaceholder() {
    if (this.currentSelectedCategory && this.currentSelectedCategory != 'all') {
      this.placeholder = `Filter ${this.currentSelectedCategory} product by keyword`;
    } else {
      this.placeholder = 'Search';
    }
  }
}
