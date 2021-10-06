import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IDynamicWindowParams } from '../interfaces';

export const DYNAMIC_WINDOW_SHARED_CONFIG: InjectionToken<Observable<IDynamicWindowParams>> = new InjectionToken(
    'DYNAMIC_WINDOW_SHARED_CONFIG'
);
