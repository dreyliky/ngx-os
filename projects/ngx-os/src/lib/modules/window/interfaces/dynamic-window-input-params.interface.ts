import { Type } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { IDynamicWindowParams } from './dynamic-window-params.interface';

/** @internal */
export interface IDynamicWindowInputParams {
    component: Type<any>;
    config: IDynamicWindowParams;
    windowRef: DynamicWindowRef;
}
