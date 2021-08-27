import { Type } from '@angular/core';
import { DynamicWindowParams, GridItem } from '@lib-modules';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: GridItem;
    windowParams: DynamicWindowParams;
}
