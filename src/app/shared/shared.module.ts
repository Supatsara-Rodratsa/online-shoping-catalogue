import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
@NgModule({
  declarations: [CartButtonComponent],
  imports: [CommonModule],
  exports: [CartButtonComponent],
  providers: [CurrencyPipe],
})
export class SharedModule {}
