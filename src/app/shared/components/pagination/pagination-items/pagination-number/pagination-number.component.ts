import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-number',
  templateUrl: './pagination-number.component.html',
  styleUrls: ['./pagination-number.component.css'],
})
export class PaginationNumberComponent {
  @Input()
  name = '';

  @Input()
  isActive = false;
}
