import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent {
  @Input()
  variant: 'contained' | 'text' | 'round' = 'contained';

  @Input()
  isDisable = false;
}
