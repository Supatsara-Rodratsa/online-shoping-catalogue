import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @Input()
  title = 'Product Title';

  @Input()
  price = 20;

  @Input()
  showButton = true;

  handleButtonClick(clicked: boolean) {
    console.log(clicked);
  }
}
