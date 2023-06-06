import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
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

  currentLanguage = this.languageService.language === LANGUAGE.FR;

  constructor(
    private productService: ProductService,
    private languageService: LanguageService,
  ) {
    this.allCartItems$ = this.productService.allCartItems;
    this.totalPrice$ = this.productService.totalPrice;
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

  updateCurrentLanguage(lang: boolean) {
    this.languageService.setLanguage(lang ? LANGUAGE.FR : LANGUAGE.EN);
  }
}
