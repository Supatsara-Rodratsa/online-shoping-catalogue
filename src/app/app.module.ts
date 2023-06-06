import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductStoreComponent } from './product-store/product-store.component';
import { ProductStoreModule } from './product-store/product-store.module';
import { LanguageService } from './services/language.service';
import { LANGUAGE } from 'src/settings';

function initializeApp(languageService: LanguageService) {
  return () => languageService.setLanguage(LANGUAGE.EN);
}

@NgModule({
  declarations: [AppComponent, ProductStoreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ProductStoreModule,
  ],
  providers: [
    LanguageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [LanguageService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
