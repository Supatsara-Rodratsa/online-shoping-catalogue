import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { LanguageService } from 'src/app/services/language.service';
import { ProductService } from 'src/app/services/product.service';
import { LANGUAGE } from 'src/settings';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css'],
})
export class ProductCatalogueComponent {
  totalPrice$;
  filterProducts$;
  categories$;

  currentSelectedCategory = 'all';
  currentSearchKeyword = '';
  placeholder = 'Search';
  currentPage = 1;
  currentLanguage = this.languageService.language === LANGUAGE.FR;
  pageSize = 0;

  constructor(
    private productService: ProductService,
    private languageService: LanguageService,
  ) {
    this.totalPrice$ = this.productService.totalPrice;
    this.filterProducts$ = this.productService.filteredProducts$;
    this.categories$ = this.productService.categories$;
    this.pageSize = this.productService.pageSize.value;
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

  updateCurrentLanguage(lang: boolean) {
    this.languageService.setLanguage(lang ? LANGUAGE.FR : LANGUAGE.EN);
  }
}
