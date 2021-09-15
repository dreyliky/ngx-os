import { Type } from '@angular/core';
import { GridItem, IDynamicWindowParams } from '@lib-modules';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: GridItem;
    windowParams: IDynamicWindowParams;
}
