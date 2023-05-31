import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent {
  @Input()
  placeholder = 'Search';

  @Input()
  name = 'search';

  @Input()
  id = 'search';

  @Output()
  searchValue = new EventEmitter<string>();

  searchItem(searchKey: HTMLInputElement) {
    this.searchValue.emit(searchKey.value);
  }
}
