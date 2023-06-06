import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogueItemComponent } from './product-catalogue-item/product-catalogue-item.component';

@NgModule({
  declarations: [ProductCatalogueItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [ProductCatalogueItemComponent],
})
export class ProductCatalogueModule {}
