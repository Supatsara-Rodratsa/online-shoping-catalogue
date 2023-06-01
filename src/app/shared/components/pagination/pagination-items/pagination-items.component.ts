import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-items',
  templateUrl: './pagination-items.component.html',
  styleUrls: ['./pagination-items.component.css'],
})
export class PaginationItemsComponent {
  @Input()
  totalPages = 0;

  @Input()
  currentPage = 1;

  @Output()
  handleCurrentPageChange = new EventEmitter<number>();

  getPageRange(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  handlePaginationNumberOnClicked(value: number) {
    if (this.currentPage !== value) {
      this.currentPage = value;
      this.handleCurrentPageChange.emit(value);
    }
  }

  handlePaginationArrowOnClicked(value: 'prev' | 'first' | 'next' | 'last') {
    switch (value) {
      case 'prev':
        if (this.currentPage > 1) {
          this.handlePaginationNumberOnClicked(this.currentPage - 1);
        }
        break;
      case 'first':
        this.handlePaginationNumberOnClicked(1);
        break;
      case 'next':
        if (this.currentPage < this.totalPages) {
          this.handlePaginationNumberOnClicked(this.currentPage + 1);
        }
        break;
      case 'last':
        this.handlePaginationNumberOnClicked(this.totalPages);
        break;
      default:
        break;
    }
  }
}
