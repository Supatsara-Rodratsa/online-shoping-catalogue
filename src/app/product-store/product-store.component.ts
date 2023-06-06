import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { LanguageService } from '../services/language.service';
import { LANGUAGE } from 'src/settings';

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
  totalPrice$;
  allCartItems$;
  filterProducts$;
  categories$;

  currentSelectedCategory = 'all';
  currentSearchKeyword = '';
  placeholder = 'Search';
  currentPage = 1;
  currentLanguage = LANGUAGE.EN;

  constructor(
    private productService: ProductService,
    private languageService: LanguageService,
  ) {
    this.allCartItems$ = this.productService.allCartItems;
    this.totalPrice$ = this.productService.totalPrice;
    this.filterProducts$ = this.productService.filteredProducts$;
    this.categories$ = this.productService.categories$;
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

  updateOnSelectedCategoryChanged(selectedCategory: string) {
    this.productService.category.next(selectedCategory);
    this.currentSelectedCategory = selectedCategory;
    this.initCurrentPage();
  }

  updateOnSearchChanged(keyword: string) {
    this.productService.keyword.next(keyword);
    this.currentSearchKeyword = keyword;
    if (keyword.length > 3) this.initCurrentPage();
  }

  updateOnPageChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.productService.page.next(this.currentPage);
  }

  initCurrentPage() {
    this.currentPage = 1;
    this.productService.page.next(this.currentPage);
  }

  updatePlaceholder() {
    if (this.currentSelectedCategory && this.currentSelectedCategory != 'all') {
      this.placeholder = `Filter ${this.currentSelectedCategory} product by keyword`;
    } else {
      this.placeholder = 'Search';
    }
  }

  updateCurrentLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
