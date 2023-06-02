import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCatalogueItemComponent } from './product-catalogue-item/product-catalogue-item.component';
import { CategoriesPipe } from './pipes/categories.pipe';

@NgModule({
  declarations: [ProductCatalogueItemComponent, CategoriesPipe],
  imports: [CommonModule, SharedModule],
  exports: [ProductCatalogueItemComponent, CategoriesPipe],
})
export class ProductCatalogueModule {}
