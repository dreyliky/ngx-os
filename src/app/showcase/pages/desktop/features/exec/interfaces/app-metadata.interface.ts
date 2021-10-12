import { Type } from '@angular/core';
import { IDynamicWindowConfig } from 'ngx-os/modules';
import { Shortcut } from '../../shortcut';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: Shortcut;
    windowParams: IDynamicWindowConfig;
}
