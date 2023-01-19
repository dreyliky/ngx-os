import { InjectionToken } from '@angular/core';

export const TREE_VIEW_DISABLED_HANDLER = new InjectionToken(
    'TREE_VIEW_DISABLED_STATE_HANDLER',
    {
        factory: () => () => false
    }
);
