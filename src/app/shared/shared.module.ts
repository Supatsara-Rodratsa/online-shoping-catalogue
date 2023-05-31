import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabItemComponent } from './components/tab-item/tab-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
@NgModule({
  declarations: [
    CartButtonComponent,
    TabsComponent,
    TabItemComponent,
    ProductDetailsComponent,
    SearchItemComponent,
  ],
  imports: [CommonModule],
  exports: [
    CartButtonComponent,
    TabsComponent,
    ProductDetailsComponent,
    SearchItemComponent,
  ],
})
export class SharedModule {}
