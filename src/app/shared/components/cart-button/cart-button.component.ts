import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent {
  @Input()
  label = 'Click';

  @Input()
  isDisable = false;

  @Output()
  clicked = new EventEmitter<boolean>();

  handleButtonClick() {
    this.clicked.emit(true);
  }
}
