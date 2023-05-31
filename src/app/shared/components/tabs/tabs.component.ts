import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  @Input()
  tabs: string[] = [];

  @Input()
  activeTab = 'all';

  @Output()
  selectedTab = new EventEmitter<string>();

  ngOnInit(): void {
    this.tabs = ['all'].concat(this.tabs);
  }

  handleActiveTabOnChange(selectedTab: string) {
    this.activeTab = selectedTab;
    this.selectedTab.emit(selectedTab);
  }
}
