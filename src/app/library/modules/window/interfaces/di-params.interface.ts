import { Injector } from '@angular/core';
import { DynamicWindowRef } from '../classes';
import { IDynamicWindowConfig } from './config.interface';

/** @internal */
export interface IDynamicWindowDiParams {
    injector: Injector;
    config: IDynamicWindowConfig;
    windowRef: DynamicWindowRef;
}
