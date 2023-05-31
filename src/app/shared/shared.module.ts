import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { UniqueValuePipe } from './pipes/unique-value.pipe';
import { TabItemComponent } from './components/tab-item/tab-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
@NgModule({
  declarations: [
    CartButtonComponent,
    TabsComponent,
    UniqueValuePipe,
    TabItemComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule],
  exports: [CartButtonComponent, TabsComponent, ProductDetailsComponent],
})
export class SharedModule {}
