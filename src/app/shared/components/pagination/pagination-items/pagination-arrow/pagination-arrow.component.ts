import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-arrow',
  templateUrl: './pagination-arrow.component.html',
  styleUrls: ['./pagination-arrow.component.css'],
})
export class PaginationArrowComponent {
  @Input()
  variant: 'prev' | 'next' | 'first' | 'last' = 'prev';

  @Input()
  name = '';

  @Input()
  disabled = false;
}
