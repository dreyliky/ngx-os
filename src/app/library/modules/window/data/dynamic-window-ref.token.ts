import { InjectionToken } from '@angular/core';
import { IDynamicWindowRef } from '../interfaces';

/** An injection token that can be used to get window reference inside your component */
export const DYNAMIC_WINDOW_REF: InjectionToken<IDynamicWindowRef> = new InjectionToken(
    'DYNAMIC_WINDOW_REF'
);
