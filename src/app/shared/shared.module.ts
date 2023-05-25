import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { CurrencyPipe } from './pipes/currency.pipe';
@NgModule({
  declarations: [CartButtonComponent, CurrencyPipe],
  imports: [CommonModule],
  exports: [CartButtonComponent, CurrencyPipe],
  providers: [CurrencyPipe, DecimalPipe],
})
export class SharedModule {}
