import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import type { DynamicWindowConfig } from '../interfaces';

/** An injection token that can be used to get shared config of dynamic windows */
export const DYNAMIC_WINDOW_SHARED_CONFIG:
    InjectionToken<Observable<DynamicWindowConfig>> =
    new InjectionToken('DYNAMIC_WINDOW_SHARED_CONFIG');
