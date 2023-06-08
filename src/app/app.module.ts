import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductStoreComponent } from './product/product-store/product-store.component';
import { ProductStoreModule } from './product/product-store/product-store.module';
import { LanguageService } from './services/language.service';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductRoutingModule } from './product/product.routing';
import { FormsModule } from '@angular/forms';
import { MetaDataService } from './services/meta-data.service';
import { AppSettingService } from './services/app-setting.service';
import { APP_SETTINGS } from './app.setting';

function initializeApp(metaDataService: MetaDataService) {
  console.log('==== APP INITIALIZER  ====');
  return () => metaDataService.product$;
}

function initializeAppSetting(appSettingService: AppSettingService) {
  console.log('==== APP CONFIG INITIALIZER ===');
  return appSettingService.appSetting$;
}

@NgModule({
  declarations: [
    AppComponent,
    ProductStoreComponent,
    ProductComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ProductStoreModule,
    ProductRoutingModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    LanguageService,
    AppSettingService,
    MetaDataService,
    {
      provide: APP_SETTINGS,
      useFactory: initializeAppSetting,
      deps: [AppSettingService, LanguageService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [APP_SETTINGS, MetaDataService],
      multi: true,
    },
  ],
})
export class AppModule {}
