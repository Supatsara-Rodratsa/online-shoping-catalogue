import { Injectable } from '@angular/core';
import { Cart, Product } from '../../interfaces/product.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  private products: Product[] = [];
  private cartItems: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);
  // Observable stream for totalPrice
  private totalPrice$ = this.cartItems.pipe(
    map((items: Cart[]) => this.calculateTotalPrice(items)),
  );

  getAllProducts(): Product[] {
    return this.products;
  }

  setAllProducts(products: Product[]): void {
    this.products = products;
  }

  getAllCartItemsObservable(): Observable<Cart[]> {
    return this.cartItems.asObservable();
  }

  getTotalPrice(): Observable<number> {
    return this.totalPrice$;
  }

  addCartItem(product: Product): void {
    const currentItemIndex = this.cartItems.value.findIndex(
      (item) => item.product.id === product.id,
    );

    if (currentItemIndex !== -1) {
      const currentProductCartDetail = this.cartItems.value[currentItemIndex];
      const updatedCartItems = [...this.cartItems.value];
      updatedCartItems[currentItemIndex] = {
        ...currentProductCartDetail,
        quantity: currentProductCartDetail.quantity + 1,
        isUpdated: true,
      };

      this.cartItems.next(updatedCartItems);
    } else {
      const newCartItem = {
        product,
        quantity: 1,
      };
      const updatedCartItems = [...this.cartItems.value, newCartItem];

      this.cartItems.next(updatedCartItems);
    }
  }

  removeCartItem(product: Product): void {
    const currentItemIndex = this.cartItems.value.findIndex(
      (item) => item.product.id === product.id,
    );
    if (currentItemIndex !== -1) {
      const updatedCartItems = [...this.cartItems.value];
      const currentCartItem = updatedCartItems[currentItemIndex];
      const updateQuantity = (currentCartItem.quantity -= 1);

      if (updateQuantity > 0) {
        currentCartItem.quantity = updateQuantity;
        updatedCartItems[currentItemIndex] = {
          ...currentCartItem,
          isUpdated: true,
        };
      } else {
        updatedCartItems.splice(currentItemIndex, 1);
      }
      this.cartItems.next(updatedCartItems);
    }
  }

  clearCartItems(): void {
    this.cartItems.next([]);
  }

  private calculateTotalPrice(items: Cart[]): number {
    let totalPrice = 0;
    totalPrice = items.reduce((total: number, item: Cart) => {
      return total + item.product.price * item.quantity;
    }, 0);
    return totalPrice;
  }
}
