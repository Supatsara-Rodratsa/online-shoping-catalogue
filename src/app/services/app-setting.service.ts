import { LANGUAGE, PAGE_SIZE, PRODUCT_SERVICE_API } from 'src/settings';
import { AppSetting } from '../interfaces/app.interface';
import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingService {
  private appSetting = new BehaviorSubject<AppSetting>({
    dataSourceURL: PRODUCT_SERVICE_API.EN,
    pageSize: PAGE_SIZE,
    language: this.languageService.language,
  });

  appSetting$ = this.appSetting.asObservable();

  constructor(private languageService: LanguageService) {
    languageService.currentLanguage$.subscribe((lang) => {
      console.log(lang);
      let dataSourceURL = PRODUCT_SERVICE_API.EN;
      let language = LANGUAGE.EN;
      if (languageService.language === LANGUAGE.FR) {
        dataSourceURL = PRODUCT_SERVICE_API.FR;
        language = LANGUAGE.FR;
      }

      this.appSetting.next({
        dataSourceURL,
        pageSize: PAGE_SIZE,
        language,
      });
    });
  }
}
