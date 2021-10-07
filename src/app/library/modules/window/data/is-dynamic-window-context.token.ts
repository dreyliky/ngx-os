import { InjectionToken } from '@angular/core';

/**
 * An injection token that can be used to understand is your component opened inside the dynamic window.
 * Might be useful if your component is in use both outside and inside of the dynamic window
 * and you want to set up specific logic depending on this information
 **/
export const IS_DYNAMIC_WINDOW_CONTEXT: InjectionToken<boolean> = new InjectionToken(
    'IS_DYNAMIC_WINDOW_CONTEXT',
    { providedIn: 'root', factory: () => false }
);
