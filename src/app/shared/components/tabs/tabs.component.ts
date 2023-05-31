import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  @Input()
  tabs: Tab[] = [];

  @Input()
  activeTab = 'all';

  @Output()
  selectedTab = new EventEmitter<string>();

  ngOnInit(): void {
    this.tabs = [
      { name: 'all', quantity: this.getAllItemQuantity() },
      ...this.tabs,
    ];
  }

  handleActiveTabOnChange(selectedTab: string) {
    this.activeTab = selectedTab;
    this.selectedTab.emit(selectedTab);
  }

  getAllItemQuantity() {
    return (this.tabs as Tab[]).reduce(
      (acc, item) => acc + (item?.quantity || 0),
      0,
    );
  }

  isStringArray(): boolean {
    return Array.isArray(this.tabs) && typeof this.tabs[0] === 'string';
  }
}
