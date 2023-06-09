import { Component, OnDestroy } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { LANGUAGE } from 'src/settings';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, tap } from 'rxjs';
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
  loading$;
  router$!: Subscription;
  cartItem$!: Subscription;

  currentLanguage = this.languageService.language === LANGUAGE.FR;
  isCheckout = false;

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
      });
  }

  ngOnDestroy(): void {
    this.router$?.unsubscribe();
    this.cartItem$?.unsubscribe();
  }

  addCartItem(selectedProduct: Product) {
    this.productService.addCartItem(selectedProduct);
  }

  removeCartItem(selectedProduct: Product) {
    this.productService.removeCartItem(selectedProduct);

    if (this.isCheckout) {
      this.cartItem$ = this.allCartItems$
        .pipe(
          tap((items) => {
            if (items.length == 0) this.router.navigate(['']);
          }),
        )
        .subscribe();
    }
  }

  clearCartItems() {
    this.productService.clearCartItems();
  }

  updateCurrentLanguage(lang: boolean) {
    this.productService.category.next('all');
    this.router.navigate(['']);
    this.languageService.setLanguage(lang ? LANGUAGE.FR : LANGUAGE.EN);
  }
}
