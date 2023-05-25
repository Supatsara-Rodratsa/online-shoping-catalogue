import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProductStoreModule } from './product-store/product-store.module';
import { SharedModule } from './shared/shared.module';
import { ProductStoreComponent } from './product-store/product-store.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ProductStoreModule, SharedModule],
      declarations: [AppComponent, ProductStoreComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
