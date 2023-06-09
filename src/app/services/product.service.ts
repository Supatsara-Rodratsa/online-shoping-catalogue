import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, of } from 'rxjs';
import {
  Cart,
  FilterProduct,
  Pagination,
  Product,
  Tab,
} from '../interfaces/product.interface';
import { APP_SETTINGS } from '../app.setting';
import { AppSetting } from '../interfaces/app.interface';
import { MetaDataService } from './meta-data.service';

@Injectable()
export class ProductService {
  private cartItems = new BehaviorSubject<Map<number, Cart>>(
    new Map<number, Cart>(),
  );

  /**
   * All Observables using in Product Catalogue
   */
  filteredProducts$!: Observable<FilterProduct>;
  product$!: Observable<Product[]>;
  categories$!: Observable<Tab[]>;
  pageSize$ = of(0);

  category = new BehaviorSubject<string>('all');
  keyword = new BehaviorSubject<string>('');
  page = new BehaviorSubject<number>(1);

  constructor(
    private metaDataService: MetaDataService,
    @Inject(APP_SETTINGS)
    private appSetting$: Observable<AppSetting>,
  ) {
    this.initializeProductService();
  }

  private initializeProductService() {
    /**
     * Get Updated Products from MetaData Service
     * that is always updated when App Setting Token is changed
     */
    this.product$ = this.metaDataService.product$;

    /**
     * Get Updated PageSize form App Setting Token for
     * using in Product Catalogue Components
     */
    this.pageSize$ = this.appSetting$.pipe(map((setting) => setting.pageSize));

    /**
     * Using CombineLatest to update Categories and Product Filtering
     * and using in Product Catalogue Components
     */
    this.updateLatestCategories();
    this.updateLatestProductsFiltering();
  }

  get allCartItems(): Observable<Cart[]> {
    return this.cartItems.pipe(map((items) => Array.from(items.values())));
  }

  get totalPrice(): Observable<number> {
    return this.cartItems.pipe(
      map((items) => Array.from(items.values())),
      map((items) => this.calculateTotalPrice(items)),
    );
  }

  addCartItem(product: Product): void {
    const currentAllCartItems = this.cartItems.getValue();
    const item = currentAllCartItems.get(product.id);
    currentAllCartItems.set(product.id, {
      ...product,
      quantity: item ? (item.quantity += 1) : 1,
      isUpdated: item ? false : true,
    });
    this.cartItems.next(currentAllCartItems);
  }

  removeCartItem(product: Product): void {
    const currentAllCartItems = this.cartItems.getValue();
    const item = currentAllCartItems.get(product.id);
    if (item) {
      item.quantity -= 1;
      if (item.quantity > 0) {
        currentAllCartItems.set(product.id, { ...item });
      } else {
        currentAllCartItems.delete(product.id);
      }
    }
    this.cartItems.next(currentAllCartItems);
  }

  clearCartItems(): void {
    this.cartItems.next(new Map<number, Cart>());
  }

  private calculateTotalPrice(items: Cart[]): number {
    let totalPrice = 0;
    totalPrice = items.reduce((total: number, item: Cart) => {
      return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
  }

  private filterProductByCategory(
    products: Product[],
    category: string,
  ): Product[] {
    if (!category || category == 'all') return products;
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  private filterProductByKeyword(
    products: Product[],
    keyword: string | undefined,
  ): Product[] {
    if (!keyword || keyword == '' || keyword.length <= 3) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  private handlePagination(
    products: Product[],
    paginationSetting?: Pagination,
  ): Product[] {
    if (paginationSetting) {
      const { pageSize, currentPage } = paginationSetting;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return products.slice(startIndex, endIndex);
    }
    return products;
  }

  private categorizedProductItems(products: Product[]): Tab[] {
    let totalItem = 0;
    const namedTabsMap = new Map<string, Tab>();
    products.forEach((product) => {
      const tab = namedTabsMap.get(product.category);
      if (tab) {
        namedTabsMap.set(product.category, {
          name: product.category,
          quantity: (tab.quantity || 0) + 1,
        });
      } else {
        namedTabsMap.set(product.category, {
          name: product.category,
          quantity: 1,
        });
      }
      totalItem += 1;
    });
    return [
      { name: 'all', quantity: totalItem },
      ...Array.from(namedTabsMap.values()),
    ];
  }

  private updateLatestCategories() {
    this.categories$ = this.product$.pipe(
      map((products) => this.categorizedProductItems(products)),
    );
  }

  private updateLatestProductsFiltering() {
    this.filteredProducts$ = combineLatest([
      this.product$,
      this.pageSize$,
      this.category.asObservable(),
      this.keyword.asObservable(),
      this.page.asObservable(),
    ]).pipe(
      map(([products, pageSize, category, keyword, page]) => {
        const filterProductByCategory = this.filterProductByCategory(
          products,
          category,
        );

        const filterProductByKeyword = this.filterProductByKeyword(
          filterProductByCategory,
          keyword,
        );
        const filterProductByPagination = this.handlePagination(
          filterProductByKeyword,
          {
            pageSize,
            currentPage: page,
          },
        );

        return {
          filterItems: filterProductByPagination,
          totalItems: filterProductByKeyword.length,
        } as FilterProduct;
      }),
    );
  }
}
