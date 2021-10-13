import { Type } from '@angular/core';
import { DynamicWindowRefModel } from '../classes';

/** @internal */
export interface DynamicWindowInputParams {
    component: Type<any>;
    windowRef: DynamicWindowRefModel;
}
