import { Type } from '@angular/core';
import { DynamicWindowConfig, DynamicWindowRef } from '../classes';

export interface DynamicWindowInputParams {
    childComponent: Type<any>;
    config: DynamicWindowConfig;
    windowRef: DynamicWindowRef;
}
