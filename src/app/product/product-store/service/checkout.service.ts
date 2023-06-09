import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { OrderPurchase } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { HOST } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
  ) {}

  submitOrderPurchase(data: OrderPurchase) {
    combineLatest([
      this.productService.allCartItems,
      this.productService.totalPrice,
    ]).pipe(
      take(1),
      switchMap(([cartItems, totalPrice]) => {
        this.loadingSubject.next(true);
        data.orderItems = cartItems;
        data.totalPrice = totalPrice;
        return this.http.post(`${HOST}/orders`, data);
      }),
      tap(() => {
        this.productService.clearCartItems();
        this.router.navigate(['success']);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('There is something wrong! ', error);
        throw error;
      }),
    );
  }
}
