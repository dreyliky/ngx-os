import { Type } from '@angular/core';
import { DynamicWindowConfig } from 'ngx-os';
import { Shortcut } from '../../shortcut';

export interface AppMetadata {
    component: Type<any>;
    shortcutParams: Shortcut;
    windowParams: DynamicWindowConfig;
}
