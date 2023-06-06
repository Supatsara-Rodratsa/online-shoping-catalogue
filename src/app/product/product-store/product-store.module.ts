import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCartModule } from './product-cart/product-cart.module';
import { ProductCatalogueModule } from './product-catalogue/product-catalogue.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../services/product.service';
import { APP_SETTINGS } from '../../app.setting';
import { AppSettingService } from '../../services/app-setting.service';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';

function initializeAppSetting(appSettingService: AppSettingService) {
  return appSettingService.appSetting$;
}
@NgModule({
  declarations: [
    ProductCatalogueComponent,
    ProductCartComponent,
    ProductCheckoutComponent,
  ],
  exports: [
    ProductCatalogueComponent,
    ProductCartComponent,
    ProductCheckoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductCartModule,
    ProductCatalogueModule,
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
