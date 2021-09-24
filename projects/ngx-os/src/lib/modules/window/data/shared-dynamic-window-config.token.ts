import { InjectionToken } from '@angular/core';
import { IDynamicWindowParams } from '@lib-modules';
import { Observable, of } from 'rxjs';
import { DynamicWindowConfig } from '../classes';

export const SHARED_DYNAMIC_WINDOW_CONFIG = new InjectionToken<Observable<IDynamicWindowParams>>(
    'SHARED_DYNAMIC_WINDOW_CONFIG',
    { providedIn: 'root', factory: () => of(new DynamicWindowConfig()) }
);
