import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { UniqueValuePipe } from './pipes/unique-value.pipe';
import { TabItemComponent } from './components/tab-item/tab-item.component';
@NgModule({
  declarations: [
    CartButtonComponent,
    TabsComponent,
    UniqueValuePipe,
    TabItemComponent,
  ],
  imports: [CommonModule],
  exports: [CartButtonComponent, TabsComponent],
})
export class SharedModule {}
