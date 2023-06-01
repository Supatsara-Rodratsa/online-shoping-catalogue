import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationItemsComponent } from './pagination-items/pagination-items.component';
import { PaginationNumberComponent } from './pagination-items/pagination-number/pagination-number.component';
import { PaginationArrowComponent } from './pagination-items/pagination-arrow/pagination-arrow.component';

@NgModule({
  declarations: [
    PaginationItemsComponent,
    PaginationNumberComponent,
    PaginationArrowComponent,
  ],
  imports: [CommonModule],
  exports: [
    PaginationItemsComponent,
    PaginationNumberComponent,
    PaginationArrowComponent,
  ],
})
export class PaginationModule {}
