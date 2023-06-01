import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Cart,
  FilterProduct,
  Pagination,
  Product,
} from '../interfaces/product.interface';
import { ajax } from 'rxjs/ajax';
import { APP_API_ENDPOINT } from '../app.setting';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$;
  private cartItems = new BehaviorSubject<Map<number, Cart>>(
    new Map<number, Cart>(),
  );
  private filteredProductsSubject = new BehaviorSubject<FilterProduct>({
    filterItems: [],
    totalItems: 0,
  });

  constructor(@Inject(APP_API_ENDPOINT) private appApiEndpoint: string) {
    this.products$ = ajax.getJSON<Product[]>(this.appApiEndpoint);
  }

  getAllProducts(): Observable<Product[]> {
    return this.products$;
  }

  getAllCartItems(): Observable<Cart[]> {
    return this.cartItems.pipe(map((items) => Array.from(items.values())));
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems.pipe(
      map((items) => Array.from(items.values())),
      map((items) => this.calculateTotalPrice(items)),
    );
  }

  getAllFilterProducts(): Observable<FilterProduct> {
    return this.filteredProductsSubject.asObservable();
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

  filterProducts(
    category: string,
    keyword?: string,
    paginationSetting?: Pagination,
  ): void {
    this.products$
      .pipe(
        map((products) => {
          const isAllCategories = category === 'all';
          // Return all products
          if (isAllCategories && !keyword) {
            return {
              filterItems: this.handlePagination(products, paginationSetting),
              totalItems: products.length,
            };
          }

          const filterProductsByCategory = this.filterProductByCategory(
            products,
            category,
          );

          // Filter Search product by keyword
          if (keyword) {
            const filterItems = this.filterProductByKeyword(
              isAllCategories ? products : filterProductsByCategory,
              keyword,
            );

            return {
              filterItems: this.handlePagination(
                filterItems,
                paginationSetting,
              ),
              totalItems: filterItems.length,
            };
          }

          // Filter by categories
          return {
            filterItems: this.handlePagination(
              filterProductsByCategory,
              paginationSetting,
            ),
            totalItems: filterProductsByCategory.length,
          };
        }),
      )
      .subscribe((filteredProducts) => {
        this.filteredProductsSubject.next(filteredProducts);
      });
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
    return products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  private filterProductByKeyword(
    products: Product[],
    keyword: string,
  ): Product[] {
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
}
