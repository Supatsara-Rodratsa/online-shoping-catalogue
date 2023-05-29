import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
@NgModule({
  declarations: [CartButtonComponent],
  imports: [CommonModule],
  exports: [CartButtonComponent],
})
export class SharedModule {}
