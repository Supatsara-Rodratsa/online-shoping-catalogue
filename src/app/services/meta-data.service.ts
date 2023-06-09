import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  delay,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { APP_SETTINGS } from '../app.setting';
import { AppSetting } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class MetaDataService {
  private product = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private subscription!: Subscription;

  loading$ = this.loadingSubject.asObservable();
  product$ = this.product.asObservable();

  constructor(
    @Inject(APP_SETTINGS)
    private appSetting$: Observable<AppSetting>,
    private httpClient: HttpClient,
  ) {
    this.initializeProductItem();
  }

  /**
   * Always fetching new url once App Setting Token is updated
   */
  initializeProductItem(): void {
    this.subscription = this.appSetting$
      .pipe(
        switchMap((setting) => {
          this.loadingSubject.next(true);
          return this.httpClient.get<Product[]>(setting.dataSourceURL).pipe(
            delay(2000),
            tap((product) => {
              this.product.next(product);
              this.loadingSubject.next(false);
              console.log(
                `==== Fetched ${setting.language.toUpperCase()} Product Successfully ====`,
              );
            }),
          );
        }),
      )
      .subscribe();
  }

  /**
   * Prevent Data Leak
   */
  unsubscribeProductItems(): void {
    this.subscription?.unsubscribe();
  }
}
