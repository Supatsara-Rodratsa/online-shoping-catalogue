import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  private _totalItems = 0;

  @Input()
  currentPage = 0;

  @Input()
  pageSize = 3;

  @Input()
  set totalItems(value: number) {
    this._totalItems = value;
    this.initialTotalPage();
  }

  @Output()
  pageChanged = new EventEmitter<number>();

  totalPages = 0;

  ngOnInit(): void {
    this.initialTotalPage();
  }

  initialTotalPage() {
    this.totalPages = Math.ceil(this._totalItems / this.pageSize);
  }

  handleCurrentPageChange(currentPage: number) {
    this.pageChanged.emit(currentPage);
  }
}
