import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IDynamicWindowParams } from '../interfaces';

export const DYNAMIC_WINDOW_SHARED_CONFIG = new InjectionToken<Observable<IDynamicWindowParams>>(
    'DYNAMIC_WINDOW_SHARED_CONFIG'
);
