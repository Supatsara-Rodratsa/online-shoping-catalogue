import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  currentPage = 0;

  @Input()
  pageSize = 3;

  @Input()
  totalItems = 20;

  @Output()
  pageChanged = new EventEmitter<number>();

  totalPages = 0;

  ngOnInit(): void {
    this.initialTotalPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems']) {
      this.initialTotalPage();
    }
  }

  initialTotalPage() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  handleCurrentPageChange(currentPage: number) {
    this.pageChanged.emit(currentPage);
  }
}
