import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from './tab-item/tab-item.component';

@NgModule({
  declarations: [TabItemComponent],
  imports: [CommonModule],
  exports: [TabItemComponent],
})
export class TabsModule {}
