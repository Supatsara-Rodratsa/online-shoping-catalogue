import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable, map } from 'rxjs';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private productService: ProductService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.productService.allCartItems.pipe(
      map((cartItems) => {
        if (cartItems.length === 0) {
          return this.router.parseUrl('/');
        }
        return true;
      }),
    );
  }
}
