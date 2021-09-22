import { Type } from '@angular/core';
import { IDynamicWindowParams, IGridItem } from '@lib-modules';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: IGridItem;
    windowParams: IDynamicWindowParams;
}
