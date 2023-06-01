import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TabsModule } from './components/tabs/tabs.module';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationModule } from './components/pagination/pagination.module';
@NgModule({
  declarations: [
    CartButtonComponent,
    ProductDetailsComponent,
    SearchItemComponent,
    HighlightDirective,
    TabsComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, TabsModule, PaginationModule],
  exports: [
    CartButtonComponent,
    ProductDetailsComponent,
    SearchItemComponent,
    TabsComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
