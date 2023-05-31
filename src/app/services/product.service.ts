import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cart, Product } from '../interfaces/product.interface';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$ = ajax.getJSON<Product[]>('/assets/mocks/products.json');
  private cartItems = new BehaviorSubject<Map<number, Cart>>(
    new Map<number, Cart>(),
  );

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
}
