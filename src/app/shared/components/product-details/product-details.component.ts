import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
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
  addItem = new EventEmitter<void>();

  @Output()
  removeItem = new EventEmitter<void>();

  handleAddButtonClick() {
    this.addItem.emit();
  }

  handleRemoveButtonClick() {
    this.removeItem.emit();
  }
}
