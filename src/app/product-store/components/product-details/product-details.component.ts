import { DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnChanges {
  @Input()
  variant: 'cart' | 'catalogue' = 'catalogue';

  @Input()
  title!: string;

  @Input()
  price = 0;

  @Input()
  showButton = true;

  @Input()
  quantity = 0;

  @Output()
  addItem = new EventEmitter<boolean>();

  convertPrice: BehaviorSubject<string> = new BehaviorSubject<string>('0.00');

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['price'].currentValue) {
      this.convertPrice.next(
        this.decimalPipe.transform(this.price.toString(), '1.2-2') || '-',
      );
    }
  }

  handleAddButtonClick() {
    this.addItem.emit(true);
  }
}
