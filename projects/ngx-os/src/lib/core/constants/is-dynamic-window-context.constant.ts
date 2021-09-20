import { InjectionToken } from '@angular/core';

export const IS_DYNAMIC_WINDOW_CONTEXT = new InjectionToken(
    'IS_DYNAMIC_WINDOW_CONTEXT',
    { providedIn: 'root', factory: () => false }
);
