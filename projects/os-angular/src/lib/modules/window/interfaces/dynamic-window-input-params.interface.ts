import { Type } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { DynamicWindowParams } from './dynamic-window-params.interface';

export interface DynamicWindowInputParams {
    component: Type<any>;
    config: DynamicWindowParams;
    windowRef: DynamicWindowRef;
}
