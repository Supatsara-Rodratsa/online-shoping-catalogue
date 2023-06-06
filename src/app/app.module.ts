import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductStoreComponent } from './product/product-store/product-store.component';
import { ProductStoreModule } from './product/product-store/product-store.module';
import { LanguageService } from './services/language.service';
import { LANGUAGE } from 'src/settings';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductRoutingModule } from './product/product.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

function initializeApp(languageService: LanguageService) {
  return () => languageService.setLanguage(LANGUAGE.EN);
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
    ReactiveFormsModule,
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
