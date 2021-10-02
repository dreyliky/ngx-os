import { Type } from '@angular/core';
import { DynamicWindowRef } from '../classes';

/** @internal */
export interface IDynamicWindowInputParams {
    component: Type<any>;
    windowRef: DynamicWindowRef;
}
