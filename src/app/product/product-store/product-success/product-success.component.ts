import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-success',
  templateUrl: './product-success.component.html',
  styleUrls: ['./product-success.component.css'],
})
export class ProductSuccessComponent {
  constructor(private router: Router) {}

  routeToMain() {
    this.router.navigate(['/']);
  }
}
