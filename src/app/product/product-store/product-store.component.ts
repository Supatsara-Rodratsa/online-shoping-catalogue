import { Component, OnDestroy } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { LANGUAGE } from 'src/settings';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MetaDataService } from 'src/app/services/meta-data.service';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css'],
})
/**
 * Stateful Component
 * Handling everything in service
 */
export class ProductStoreComponent implements OnDestroy {
  totalPrice$;
  allCartItems$;
  router$!: Subscription;
  loading$;

  currentLanguage = this.languageService.language === LANGUAGE.FR;
  isCheckout = false;
  isSuccess = false;

  constructor(
    private metaDataService: MetaDataService,
    private productService: ProductService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.allCartItems$ = this.productService.allCartItems;
    this.totalPrice$ = this.productService.totalPrice;
    this.loading$ = this.metaDataService.loading$;

    /**
     * Tracking Current Children path
     */
    this.router$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.activatedRoute.firstChild;
        const currentPath = currentRoute?.snapshot.routeConfig?.path;
        this.isCheckout = currentPath === 'checkout';
        this.isSuccess = currentPath === 'success';
      });
  }

  ngOnDestroy(): void {
    this.router$.unsubscribe();
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
    this.productService.category.next('all');
    this.languageService.setLanguage(lang ? LANGUAGE.FR : LANGUAGE.EN);
  }
}
