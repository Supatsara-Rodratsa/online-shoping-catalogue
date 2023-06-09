import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable, map } from 'rxjs';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private productService: ProductService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.productService.allCartItems.pipe(
      map((cartItems) => {
        if (cartItems.length === 0) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
    );
  }
}
