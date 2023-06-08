import { Component, OnDestroy } from '@angular/core';
import { MetaDataService } from './services/meta-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  constructor(private metaDataService: MetaDataService) {}

  ngOnDestroy(): void {
    /**
     * Unsubscribe products when leaving the screen
     */
    this.metaDataService.unsubscribeProductItems();
  }
}
