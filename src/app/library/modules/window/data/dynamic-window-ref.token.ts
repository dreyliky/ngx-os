import { InjectionToken } from '@angular/core';
import { DynamicWindowRef } from '../interfaces';

/** An injection token that can be used to get window reference inside your component */
export const DYNAMIC_WINDOW_REF: InjectionToken<DynamicWindowRef> = new InjectionToken(
    'DYNAMIC_WINDOW_REF'
);
