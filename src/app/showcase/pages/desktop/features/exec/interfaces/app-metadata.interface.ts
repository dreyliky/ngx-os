import { Type } from '@angular/core';
import { DynamicWindowConfig } from 'ngx-os';
import { Shortcut } from '../../shortcut';

export interface AppMetadata {
    componentRef: () => Type<any>;
    shortcutParams: Shortcut;
    windowParams: DynamicWindowConfig;
}
