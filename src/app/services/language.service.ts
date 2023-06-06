import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LANGUAGE } from 'src/settings';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject(LANGUAGE.EN);
  currentLanguage$ = this.currentLanguage.asObservable();

  setLanguage(lang: string) {
    this.currentLanguage.next(lang);
  }

  get language(): string {
    return this.currentLanguage.value;
  }
}
