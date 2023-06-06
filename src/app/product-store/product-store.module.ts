import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCartModule } from './product-cart/product-cart.module';
import { ProductCatalogueModule } from './product-catalogue/product-catalogue.module';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from '../services/product.service';
import { APP_SETTINGS } from '../app.setting';
import { AppSettingService } from '../services/app-setting.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

function initializeAppSetting(appSettingService: AppSettingService) {
  return appSettingService.appSetting$;
}
@NgModule({
  declarations: [ProductCatalogueComponent, ProductCartComponent],
  exports: [ProductCatalogueComponent, ProductCartComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductCartModule,
    ProductCatalogueModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_SETTINGS,
      useFactory: initializeAppSetting,
      deps: [AppSettingService],
    },
    ProductService,
  ],
})
export class ProductStoreModule {}
