import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Cart } from 'src/app/interfaces/product.interface';
import { ProductStoreService } from '../../services/product-store.service';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnChanges {
  @Input()
  allCartItems: Cart[] = [];

  @Input()
  totalPrice = 0;

  convertTotalPrice: BehaviorSubject<string> = new BehaviorSubject<string>(
    '0.00',
  );

  constructor(
    private productStoreService: ProductStoreService,
    private decimalPipe: DecimalPipe,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPrice'].currentValue) {
      this.convertTotalPrice.next(
        this.decimalPipe.transform(this.totalPrice, '1.2-2') || '-',
      );
    }
  }

  clearCartItems() {
    this.productStoreService.clearCartItems();
  }
}
