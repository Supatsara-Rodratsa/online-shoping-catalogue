import { Component, OnDestroy } from '@angular/core';
import { MetaDataService } from './services/meta-data.service';
import { CheckoutService } from './product/product-store/service/checkout.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  loading$ = this.checkoutService.loading$;
  constructor(
    private metaDataService: MetaDataService,
    private checkoutService: CheckoutService,
  ) {}

  ngOnDestroy(): void {
    /**
     * Unsubscribe products when leaving the screen
     */
    this.metaDataService.unsubscribeProductItems();
  }
}
