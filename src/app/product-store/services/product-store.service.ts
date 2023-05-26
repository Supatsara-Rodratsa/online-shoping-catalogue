import { Injectable } from '@angular/core';
import { Cart, Product } from '../../interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService {
  private products: Product[] = [];
  private cartItems: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);
  private totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public getAllProducts(): Product[] {
    return this.products;
  }

  public setAllProducts(products: Product[]): void {
    this.products = products;
  }

  public getAllCartItemsObservable(): Observable<Cart[]> {
    return this.cartItems.asObservable();
  }

  public getTotalPrice(): Observable<number> {
    return this.totalPrice.asObservable();
  }

  public addCartItem(product: Product): void {
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
    const currentTotalPrice = this.totalPrice.value;
    this.totalPrice.next(currentTotalPrice + product.price);
  }

  public removeCartItem(product: Product): void {
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
    const currentTotalPrice = this.totalPrice.value;
    this.totalPrice.next(currentTotalPrice - product.price);
  }

  public clearCartItems(): void {
    this.cartItems.next([]);
    this.totalPrice.next(0);
  }
}
