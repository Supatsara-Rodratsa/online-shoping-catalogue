import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogueItemComponent } from './product-catalogue-item/product-catalogue-item.component';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { CategoriesPipe } from './pipes/categories.pipe';

@NgModule({
  declarations: [
    ProductCatalogueItemComponent,
    FilterProductsPipe,
    CategoriesPipe,
  ],
  imports: [CommonModule, SharedModule],
  exports: [ProductCatalogueItemComponent, FilterProductsPipe, CategoriesPipe],
})
export class ProductCatalogueModule {}
