import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cart, Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = new BehaviorSubject<Product[]>([]);
  private cartItems = new BehaviorSubject<Map<number, Cart>>(
    new Map<number, Cart>(),
  );
  private categories = new Set<string>();

  getAllProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }

  setAllProducts(products: Product[]): void {
    this.products.next(products);
    this.setAllCategories(products);
  }

  setAllCategories(products: Product[]) {
    products.forEach((product) => this.categories.add(product.category));
  }

  getAllCategories() {
    return this.categories;
  }

  getAllCartItemsObservable(): Observable<Cart[]> {
    return this.cartItems.pipe(map((items) => Array.from(items.values())));
  }

  getTotalPriceObservable(): Observable<number> {
    return this.cartItems.pipe(
      map((items) => Array.from(items.values())),
      map((items) => this.calculateTotalPrice(items)),
    );
  }

  addCartItem(product: Product): void {
    const currentAllCartItems = this.cartItems.value;
    const item = currentAllCartItems.get(product.id);
    if (item) {
      item.quantity += 1;
      item.isUpdated = false;
      currentAllCartItems.set(product.id, { ...item });
    } else {
      currentAllCartItems.set(product.id, {
        product,
        quantity: 1,
        isUpdated: true,
      });
    }
    this.cartItems.next(currentAllCartItems);
  }

  removeCartItem(product: Product): void {
    const currentAllCartItems = this.cartItems.value;
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
      return total + item.product.price * item.quantity;
    }, 0);
    return totalPrice;
  }
}
