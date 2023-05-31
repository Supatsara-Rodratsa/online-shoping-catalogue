import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductStoreComponent } from './product-store/product-store.component';
import { ProductStoreModule } from './product-store/product-store.module';

@NgModule({
  declarations: [AppComponent, ProductStoreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ProductStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
