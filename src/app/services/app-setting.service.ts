import { LANGUAGE, PAGE_SIZE, PRODUCT_SERVICE_API } from 'src/settings';
import { AppSetting } from '../interfaces/app.interface';
import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingService {
  appSetting$!: Observable<AppSetting>;

  constructor(private languageService: LanguageService) {
    this.appSetting$ = this.languageService.currentLanguage$.pipe(
      mergeMap((lang) => {
        /**
         * France Product Setting
         */
        if (this.languageService.language === LANGUAGE.FR) {
          return of({
            dataSourceURL: PRODUCT_SERVICE_API.FR,
            pageSize: PAGE_SIZE,
            language: lang,
          });
        }

        /**
         * Eng Product Setting (Default)
         */
        return of({
          dataSourceURL: PRODUCT_SERVICE_API.EN,
          pageSize: PAGE_SIZE,
          language: lang,
        });
      }),
    );
  }
}
