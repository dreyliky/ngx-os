import { Injector } from '@angular/core';
import { DynamicWindowRefModel } from '../classes';

/** @internal */
export interface DynamicWindowDiParams {
    injector: Injector;
    windowRef: DynamicWindowRefModel;
}
