import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogueItemComponent } from './product-catalogue-item/product-catalogue-item.component';
import { FilterCategoriesPipe } from './pipes/filter-categories.pipe';
import { FilterProductsPipe } from './pipes/filter-products.pipe';

@NgModule({
  declarations: [
    ProductCatalogueItemComponent,
    FilterCategoriesPipe,
    FilterProductsPipe,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    ProductCatalogueItemComponent,
    FilterCategoriesPipe,
    FilterProductsPipe,
  ],
})
export class ProductCatalogueModule {}
