import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  @Input()
  tabs: Tab[] = [];

  @Input()
  activeTab = 'all';

  @Output()
  selectedTab = new EventEmitter<string>();

  handleActiveTabOnChange(selectedTab: string) {
    this.activeTab = selectedTab;
    this.selectedTab.emit(selectedTab);
  }

  isStringArray(): boolean {
    return Array.isArray(this.tabs) && typeof this.tabs[0] === 'string';
  }
}
