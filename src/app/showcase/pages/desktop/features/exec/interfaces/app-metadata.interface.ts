import { Type } from '@angular/core';
import { IDynamicWindowConfig, IGridItem } from 'ngx-os/modules';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: IGridItem;
    windowParams: IDynamicWindowConfig;
}
