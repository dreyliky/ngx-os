import { Type } from '@angular/core';
import { IDynamicWindowParams, IGridItem } from 'ngx-os/modules';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: IGridItem;
    windowParams: IDynamicWindowParams;
}
