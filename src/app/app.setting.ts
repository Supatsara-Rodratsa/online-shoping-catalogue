import { InjectionToken } from '@angular/core';
import { AppSetting } from './interfaces/app.interface';
import { Observable } from 'rxjs';

export const APP_SETTINGS = new InjectionToken<Observable<AppSetting>>(
  'APP_SETTINGS',
);
